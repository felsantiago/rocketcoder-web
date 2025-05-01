import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/providers/auth/AuthContext'
import { RBACService } from '@/services/rbac/RBACService'
import { UserRole, ResourceType, Action } from '@/types/rbac'

export function useRBAC() {
  const { user } = useAuth()
  const [userRole, setUserRole] = useState<UserRole>('guest')
  const [loading, setLoading] = useState(true)
  const rbacService = RBACService.getInstance()

  // Carrega a role do usuário
  useEffect(() => {
    const loadUserRole = async () => {
      if (user?.id) {
        try {
          console.log('Loading role for user:', user.id)
          const role = await rbacService.getUserRole(user.id)
          console.log('Loaded role:', role)
          setUserRole(role)
        } catch (error) {
          console.error('Error loading user role:', error)
          setUserRole('guest')
        } finally {
          setLoading(false)
        }
      } else {
        console.log('No user ID found, setting role to guest')
        setUserRole('guest')
        setLoading(false)
      }
    }

    // Só carrega a role se o usuário estiver carregado
    if (!user) {
      console.log('Waiting for user to be loaded...')
      return
    }

    console.log('User loaded, starting to load role:', user)
    loadUserRole()
  }, [user])

  // Verifica se o usuário tem permissão para uma ação específica
  const checkPermission = useCallback(async (
    resource: ResourceType,
    action: Action
  ): Promise<boolean> => {
    if (!user?.id) return false

    try {
      return await rbacService.checkPermission(user.id, resource, action)
    } catch (error) {
      console.error('Error checking permission:', error)
      return false
    }
  }, [user])

  // Verifica se o usuário tem uma role específica
  const hasRole = useCallback((role: UserRole): boolean => {
    console.log('Checking if user has role:', role, 'Current role:', userRole, 'User:', user)
    return userRole === role
  }, [userRole, user])

  // Verifica se o usuário é admin
  const isAdmin = useCallback((): boolean => {
    console.log('Checking if user is admin. Current role:', userRole, 'User:', user)
    return userRole === 'admin'
  }, [userRole, user])

  // Verifica se o usuário é manager
  const isManager = useCallback((): boolean => {
    return userRole === 'manager'
  }, [userRole])

  // Atribui uma role a um usuário (apenas admin)
  const assignRole = useCallback(async (
    targetUserId: string,
    role: UserRole,
    expiresAt?: Date
  ): Promise<void> => {
    if (!user?.id || !isAdmin()) {
      throw new Error('Unauthorized')
    }

    await rbacService.assignRole(targetUserId, role, user.id, expiresAt)
  }, [user, isAdmin])

  // Remove a role de um usuário (apenas admin)
  const removeRole = useCallback(async (
    targetUserId: string
  ): Promise<void> => {
    if (!user?.id || !isAdmin()) {
      throw new Error('Unauthorized')
    }

    await rbacService.removeRole(targetUserId, user.id)
  }, [user, isAdmin])

  // Lista todas as atribuições de roles (apenas admin)
  const listRoleAssignments = useCallback(async () => {
    if (!isAdmin()) {
      throw new Error('Unauthorized')
    }

    return await rbacService.listRoleAssignments()
  }, [isAdmin])

  return {
    userRole,
    loading,
    checkPermission,
    hasRole,
    isAdmin,
    isManager,
    assignRole,
    removeRole,
    listRoleAssignments
  }
}