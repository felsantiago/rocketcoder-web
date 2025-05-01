import { UserRole, ResourceType, Action, UserRoleAssignment, hasPermission } from '@/types/rbac'
import { SecurityLogger, SecurityEventType } from '@/infrastructure/services/security-logger'
import { createBrowserClient } from '@supabase/ssr'

export class RBACService {
  private securityLogger
  private static instance: RBACService
  private supabase

  private constructor() {
    this.securityLogger = SecurityLogger.getInstance()
    this.supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }

  public static getInstance(): RBACService {
    if (!RBACService.instance) {
      RBACService.instance = new RBACService()
    }
    return RBACService.instance
  }

  /**
   * Atribui uma role a um usuário
   */
  async assignRole(
    userId: string,
    role: UserRole,
    assignedBy: string,
    expiresAt?: Date
  ): Promise<void> {
    try {
      const assignment: UserRoleAssignment = {
        userId,
        role,
        assignedBy,
        assignedAt: new Date(),
        expiresAt
      }

      const { error } = await this.supabase
        .from('user_roles')
        .upsert({
          user_id: userId,
          role,
          assigned_by: assignedBy,
          assigned_at: assignment.assignedAt.toISOString(),
          expires_at: expiresAt?.toISOString()
        })

      if (error) throw error

      // Log da atribuição de role
      await this.securityLogger.logEvent({
        type: SecurityEventType.ROLE_ASSIGNMENT,
        userId: assignedBy,
        ipAddress: window.location.hostname,
        userAgent: navigator.userAgent,
        details: {
          targetUserId: userId,
          role,
          expiresAt
        }
      })
    } catch (error) {
      console.error('Error assigning role:', error)
      throw error
    }
  }

  /**
   * Remove uma role de um usuário
   */
  async removeRole(userId: string, removedBy: string): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)

      if (error) throw error

      // Log da remoção de role
      await this.securityLogger.logEvent({
        type: SecurityEventType.ROLE_REMOVAL,
        userId: removedBy,
        ipAddress: window.location.hostname,
        userAgent: navigator.userAgent,
        details: {
          targetUserId: userId
        }
      })
    } catch (error) {
      console.error('Error removing role:', error)
      throw error
    }
  }

  /**
   * Obtém a role atual de um usuário
   */
  async getUserRole(userId: string): Promise<UserRole> {
    try {
      console.log('Getting role for user:', userId)
      const { data, error } = await this.supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .maybeSingle()

      if (error) {
        console.error('Error getting user role:', error)
        throw error
      }

      console.log('User role data:', data)
      return (data?.role as UserRole) || 'guest'
    } catch (error) {
      console.error('Error in getUserRole:', error)
      return 'guest' // Default role
    }
  }

  /**
   * Verifica se um usuário tem permissão para uma ação específica
   */
  async checkPermission(
    userId: string,
    resource: ResourceType,
    action: Action
  ): Promise<boolean> {
    try {
      const userRole = await this.getUserRole(userId)
      const permitted = hasPermission(userRole, resource, action)

      // Log da verificação de permissão
      await this.securityLogger.logEvent({
        type: SecurityEventType.PERMISSION_CHECK,
        userId,
        ipAddress: window.location.hostname,
        userAgent: navigator.userAgent,
        details: {
          resource,
          action,
          permitted
        }
      })

      return permitted
    } catch (error) {
      console.error('Error checking permission:', error)
      return false
    }
  }

  /**
   * Lista todas as roles atribuídas
   */
  async listRoleAssignments(): Promise<UserRoleAssignment[]> {
    try {
      const { data, error } = await this.supabase
        .from('user_roles')
        .select('*')
        .order('assigned_at', { ascending: false })

      if (error) throw error

      return data.map(assignment => ({
        userId: assignment.user_id,
        role: assignment.role as UserRole,
        assignedBy: assignment.assigned_by,
        assignedAt: new Date(assignment.assigned_at),
        expiresAt: assignment.expires_at ? new Date(assignment.expires_at) : undefined
      }))
    } catch (error) {
      console.error('Error listing role assignments:', error)
      return []
    }
  }

  /**
   * Verifica e atualiza roles expiradas
   */
  async checkExpiredRoles(): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('user_roles')
        .delete()
        .lt('expires_at', new Date().toISOString())

      if (error) throw error

      // Log da verificação de roles expiradas
      await this.securityLogger.logEvent({
        type: SecurityEventType.EXPIRED_ROLES_CHECK,
        ipAddress: window.location.hostname,
        userAgent: navigator.userAgent,
        details: {
          checkTime: new Date().toISOString()
        }
      })
    } catch (error) {
      console.error('Error checking expired roles:', error)
    }
  }
}