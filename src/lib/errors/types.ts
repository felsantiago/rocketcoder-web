// src/shared/errors/types.ts
export interface ApiErrorPayload {
  statusCode: number
  message: string
  code?: string
}