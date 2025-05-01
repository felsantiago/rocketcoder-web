import axios, { AxiosInstance } from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_URL

if (!baseURL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined')
}

export const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Tipos para as respostas da API
export interface ApiResponse<T = any> {
  data: T
  message?: string
  status: number
}

// Tipos para os erros da API
export interface ApiError {
  message: string
  status: number
  errors?: Record<string, string[]>
}