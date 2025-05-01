import { supabaseServer } from "@/lib/supabase/server"

// Tipos de eventos de segurança
export enum SecurityEventType {
  LOGIN_ATTEMPT = 'login_attempt',
  LOGIN_SUCCESS = 'login_success',
  LOGIN_FAILURE = 'login_failure',
  LOGOUT = 'logout',
  PASSWORD_CHANGE = 'password_change',
  PASSWORD_RESET = 'password_reset',
  PROTECTED_ROUTE_ACCESS = 'protected_route_access',
  UNAUTHORIZED_ACCESS = 'unauthorized_access',
  RATE_LIMIT_EXCEEDED = 'rate_limit_exceeded',
  SUSPICIOUS_ACTIVITY = 'suspicious_activity',
  ROLE_ASSIGNMENT = 'role_assignment',
  ROLE_REMOVAL = 'role_removal',
  PERMISSION_CHECK = 'permission_check',
  EXPIRED_ROLES_CHECK = 'expired_roles_check'
}

// Interface para eventos de segurança
export interface SecurityEvent {
  type: SecurityEventType
  userId?: string
  ipAddress: string
  userAgent: string
  details: Record<string, any>
  timestamp?: string
}

// Classe para gerenciar logs de segurança
export class SecurityLogger {
  private static instance: SecurityLogger
  private supabase

  private constructor() {
    this.supabase = supabaseServer()
  }

  public static getInstance(): SecurityLogger {
    if (!SecurityLogger.instance) {
      SecurityLogger.instance = new SecurityLogger()
    }
    return SecurityLogger.instance
  }

  // Método para registrar eventos de segurança
  async logEvent(event: Omit<SecurityEvent, 'timestamp'>): Promise<void> {
    try {
      const securityEvent = {
        type: event.type,
        user_id: event.userId,
        ip_address: event.ipAddress,
        user_agent: event.userAgent,
        details: event.details,
        timestamp: new Date().toISOString()
      }

      const { error } = await this.supabase
        .from('security_logs')
        .insert(securityEvent)

      if (error) {
        console.error('Error logging security event:', error)
      }
    } catch (error) {
      console.error('Unexpected error in security logging:', error)
    }
  }

  // Método para buscar logs de segurança
  async getSecurityLogs(
    filters: Partial<SecurityEvent> = {},
    limit: number = 100
  ): Promise<SecurityEvent[]> {
    try {
      console.log('Fetching security logs with filters:', filters)

      let query = this.supabase
        .from('security_logs')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(limit)

      // Aplica filtros se fornecidos
      if (filters.type) {
        query = query.eq('type', filters.type)
      }
      if (filters.userId) {
        query = query.eq('user_id', filters.userId)
      }
      if (filters.ipAddress) {
        query = query.eq('ip_address', filters.ipAddress)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching security logs:', error)
        return []
      }

      return (data || []).map(log => ({
        type: log.type as SecurityEventType,
        userId: log.user_id || undefined,
        ipAddress: log.ip_address,
        userAgent: log.user_agent,
        details: log.details as Record<string, any>,
        timestamp: log.timestamp
      }))
    } catch (error) {
      console.error('Unexpected error fetching security logs:', error)
      return []
    }
  }
}