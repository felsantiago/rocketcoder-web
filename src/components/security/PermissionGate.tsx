'use client'

import { ReactNode, useLayoutEffect } from 'react'
import { useRBAC } from '@/hooks/useRBAC'
import { ResourceType, Action, UserRole } from '@/types/rbac'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/auth/AuthContext'

interface PermissionGateProps {
  children: ReactNode
  resource?: ResourceType
  action?: Action
  requiredRole?: UserRole
  redirectTo?: string
}

export function PermissionGate({
  children,
  resource,
  action,
  requiredRole,
  redirectTo = '/unauthorized'
}: PermissionGateProps) {
  const router = useRouter()
  const { checkPermission, hasRole, loading: rbacLoading } = useRBAC()
  const { user, isLoading: authLoading } = useAuth()

  // Bloqueia qualquer renderização até termos certeza das permissões
  useLayoutEffect(() => {
    // Se não estiver autenticado ou carregando, não faz nada (o layout já vai redirecionar)
    if (authLoading || !user) {
      return
    }

    const checkAccess = async () => {
      try {
        let permitted = true

        if (resource && action) {
          permitted = await checkPermission(resource, action)
        }

        if (requiredRole) {
          permitted = permitted && hasRole(requiredRole)
        }

        if (!permitted) {
          router.replace(redirectTo, { scroll: false })
        }
      } catch (error) {
        console.error('Error checking permissions:', error)
        router.replace(redirectTo, { scroll: false })
      }
    }

    if (!rbacLoading) {
      checkAccess()
    }
  }, [user, authLoading, rbacLoading, resource, action, requiredRole, checkPermission, hasRole, router, redirectTo])

  // Não mostra nada até ter certeza que pode renderizar
  if (authLoading || rbacLoading || !user || !hasRole(requiredRole || 'guest')) {
    return null
  }

  return <>{children}</>
}

// HOC para facilitar o uso
export function withPermission(
  WrappedComponent: React.ComponentType<any>,
  options: Omit<PermissionGateProps, 'children'>
) {
  return function WithPermissionComponent(props: any) {
    return (
      <PermissionGate {...options}>
        <WrappedComponent {...props} />
      </PermissionGate>
    )
  }
}