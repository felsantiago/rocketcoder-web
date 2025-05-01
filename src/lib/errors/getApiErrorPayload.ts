// src/shared/errors/getApiErrorPayload.ts
import { AxiosError } from 'axios'
import { ApiErrorPayload } from './types'

export function getApiErrorPayload(error: unknown): ApiErrorPayload {
  if (isAxiosError<ApiErrorPayload>(error) && error.response?.data) {
    return error.response.data
  }

  return { statusCode: 500, message: 'Erro desconhecido.' }
}

function isAxiosError<T = unknown>(error: unknown): error is AxiosError<T> {
  return typeof error === 'object' && error !== null && 'isAxiosError' in error
}