'use client'

import { useEffect } from 'react'
import { useAuth } from '@/providers/auth/AuthContext'
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { useToast } from '@/hooks/useToast'
import { api } from '@/lib/axios'

export function AxiosInterceptors() {
  const { user } = useAuth()
  const toast = useToast()

  useEffect(() => {
    // Interceptor de requisição
    const requestInterceptor = api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (user?.access_token) {
          config.headers.Authorization = `Bearer ${user.access_token}`
        }
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    // Interceptor de resposta
    const responseInterceptor = api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response) {
          const status = error.response.status
          const data = error.response.data as { message?: string }

          switch (status) {
            case 401:
              toast.error('Sessão expirada', {
                description: 'Por favor, faça login novamente',
              })
              // TODO: Implementar logout
              break
            case 403:
              toast.error('Acesso negado', {
                description: 'Você não tem permissão para realizar esta ação',
              })
              break
            case 404:
              toast.error('Recurso não encontrado')
              break
            case 500:
              toast.error('Erro interno do servidor', {
                description: 'Tente novamente mais tarde',
              })
              break
            default:
              toast.error(data.message || 'Ocorreu um erro inesperado')
          }
        } else if (error.request) {
          toast.error('Erro de conexão', {
            description: 'Verifique sua conexão com a internet',
          })
        } else {
          toast.error('Erro ao processar requisição')
        }

        return Promise.reject(error)
      }
    )

    return () => {
      api.interceptors.request.eject(requestInterceptor)
      api.interceptors.response.eject(responseInterceptor)
    }
  }, [user, toast])

  return null
}