import { useMemo } from 'react'

interface PasswordChecklistProps {
  password: string
}

export function PasswordChecklist({ password }: PasswordChecklistProps) {
  const passwordChecks = useMemo(() => [
    { label: 'Letra maiúscula', valid: /[A-Z]/.test(password) },
    { label: 'Letra minúscula', valid: /[a-z]/.test(password) },
    { label: 'Número', valid: /\d/.test(password) },
    { label: 'Caractere especial (ex: !?<>@#$%)', valid: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
    { label: '8 caracteres ou mais', valid: password.length >= 8 },
  ], [password])

  return (
    <div className="mt-2 space-y-1.5">
      {passwordChecks.map((check, idx) => (
        <div key={idx} className="flex items-center gap-2.5">
          <div className={`w-2.5 h-2.5 rounded-full flex items-center justify-center ${
            check.valid ? 'bg-brand/10 border border-brand' : 'bg-gray-50 border border-gray-200'
          }`}>
            {check.valid ? (
              <svg
                className="w-1.5 h-1.5 text-brand"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <div className="w-1 h-1 rounded-full bg-gray-300" />
            )}
          </div>
          <span className={`text-[11px] font-medium ${
            check.valid ? 'text-brand' : 'text-gray-500'
          }`}>
            {check.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export function isPasswordValid(password: string): boolean {
  return (
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password) &&
    password.length >= 8
  )
}