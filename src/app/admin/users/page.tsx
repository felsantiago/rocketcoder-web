'use client'

import { useEffect, useState } from 'react'
import { useRBAC } from '@/hooks/useRBAC'
import { PermissionGate } from '@/components/security/PermissionGate'
import { UserRoleAssignment } from '@/types/rbac'
import { useAuth } from '@/providers/auth/AuthContext'
import { useRouter } from 'next/navigation'

export default function UsersAdminPage() {
  const { listRoleAssignments, assignRole, removeRole, loading: rbacLoading, isAdmin } = useRBAC()
  const { user, isLoading: isAuthLoading } = useAuth()
  const [roleAssignments, setRoleAssignments] = useState<UserRoleAssignment[]>([])
  const [loadingAssignments, setLoadingAssignments] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.replace('/signin')
      return
    }
  }, [user, isAuthLoading, router])

  if (isAuthLoading || !user) {
    return null
  }

  const handleAssignRole = async (userId: string, role: string, expiresAt?: Date) => {
    try {
      setError(null)
      await assignRole(userId, role as any, expiresAt)
      const assignments = await listRoleAssignments()
      setRoleAssignments(assignments)
    } catch (error) {
      console.error('Error assigning role:', error)
      setError('Erro ao atribuir role')
    }
  }

  const handleRemoveRole = async (userId: string) => {
    try {
      setError(null)
      await removeRole(userId)
      const assignments = await listRoleAssignments()
      setRoleAssignments(assignments)
    } catch (error) {
      console.error('Error removing role:', error)
      setError('Erro ao remover role')
    }
  }

  return (
    <PermissionGate
      requiredRole="admin"
      redirectTo="/signin"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gerenciamento de Usuários</h1>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
        </div>

        {loadingAssignments ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : roleAssignments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhuma atribuição de role encontrada.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID do Usuário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Atribuído por
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data de Atribuição
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expira em
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {roleAssignments.map((assignment) => (
                  <tr key={`${assignment.userId}-${assignment.role}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {assignment.userId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {assignment.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {assignment.assignedBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(assignment.assignedAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {assignment.expiresAt
                        ? new Date(assignment.expiresAt).toLocaleString()
                        : 'Nunca'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleRemoveRole(assignment.userId)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PermissionGate>
  )
}