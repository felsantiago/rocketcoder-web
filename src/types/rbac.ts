export type UserRole = 'admin' | 'manager' | 'user' | 'guest'

export type ResourceType = 'users' | 'permissions' | 'resources' | 'logs' | 'settings'

export type Action = 'create' | 'read' | 'update' | 'delete'

export interface Permission {
  resource: ResourceType
  actions: Action[]
}

export interface RoleDefinition {
  role: UserRole
  permissions: Permission[]
}

export interface UserRoleAssignment {
  userId: string
  role: UserRole
  assignedBy: string
  assignedAt: Date
  expiresAt?: Date
}

// Definição das permissões por role
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    { resource: 'users', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'permissions', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'resources', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'logs', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'settings', actions: ['create', 'read', 'update', 'delete'] }
  ],
  manager: [
    { resource: 'users', actions: ['read'] },
    { resource: 'permissions', actions: ['read'] },
    { resource: 'resources', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'logs', actions: ['read'] },
    { resource: 'settings', actions: ['read'] }
  ],
  user: [
    { resource: 'users', actions: ['read'] },
    { resource: 'permissions', actions: ['read'] },
    { resource: 'resources', actions: ['read', 'update'] }
  ],
  guest: [
    { resource: 'resources', actions: ['read'] }
  ]
}

// Função auxiliar para verificar permissões
export function hasPermission(
  userRole: UserRole,
  resource: ResourceType,
  action: Action
): boolean {
  const rolePermissions = ROLE_PERMISSIONS[userRole]
  const resourcePermission = rolePermissions.find(p => p.resource === resource)
  return resourcePermission ? resourcePermission.actions.includes(action) : false
}