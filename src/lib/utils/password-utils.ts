export function isStrongPassword(password: string): boolean {
  const minLength = 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChars
  )
}

// Função auxiliar para escapar caracteres HTML
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Função auxiliar para normalizar texto
function normalizeText(text: string): string {
  return text
    .normalize('NFKC') // Normaliza caracteres Unicode
    .replace(/[\uFE00-\uFE0F]/g, '') // Remove variações de emoji
    .replace(/\p{Diacritic}/gu, '') // Remove diacríticos
    .replace(/[^\x20-\x7E]/g, ''); // Mantém apenas caracteres ASCII imprimíveis
}

export function sanitizePassword(password: string): string {
  // Remove espaços e normaliza
  return normalizeText(password.trim());
}

export function sanitizeEmail(email: string): string {
  // Normaliza, converte para minúsculas e remove espaços
  return normalizeText(email.toLowerCase().trim());
}

export function sanitizeInput(input: string): string {
  // Remove tags HTML, escapa caracteres especiais e normaliza
  const HTML_CHARS_REGEX = /<[^>]*>?/gm;
  const SCRIPT_REGEX = /javascript:|data:|vbscript:|on\w+=/gi;
  const SQL_REGEX = /(\b(select|insert|update|delete|drop|union|exec|eval)\b)/gi;

  return escapeHtml(
    normalizeText(
      input
        .trim()
        .replace(HTML_CHARS_REGEX, '')
        .replace(SCRIPT_REGEX, '')
        .replace(SQL_REGEX, '')
    )
  );
}

// Nova função para validar e sanitizar nomes de arquivos
export function sanitizeFileName(fileName: string): string {
  // Remove caracteres inválidos e potencialmente perigosos
  return fileName
    .trim()
    .replace(/[/\\?%*:|"<>]/g, '-') // Substitui caracteres inválidos por hífen
    .replace(/\.\./g, '') // Previne directory traversal
    .replace(/^\.+|\.+$/g, '') // Remove pontos no início e fim
    .replace(/\s+/g, '-'); // Substitui espaços por hífen
}

// Nova função para sanitizar URLs
export function sanitizeUrl(url: string): string {
  // Lista de protocolos permitidos
  const ALLOWED_PROTOCOLS = ['http:', 'https:', 'mailto:', 'tel:'];

  try {
    const urlObj = new URL(url);
    // Verifica se o protocolo é permitido
    if (!ALLOWED_PROTOCOLS.includes(urlObj.protocol)) {
      return '#'; // URL inválida
    }
    return escapeHtml(urlObj.toString());
  } catch {
    return '#'; // URL inválida
  }
}

// Nova função para sanitizar JSON
export function sanitizeJson(json: string): string {
  try {
    // Tenta fazer parse e stringify para garantir JSON válido
    const parsed = JSON.parse(json);
    // Remove funções e outros valores potencialmente perigosos
    const cleaned = JSON.stringify(parsed, (key, value) => {
      if (typeof value === 'function') {
        return undefined;
      }
      return value;
    });
    return cleaned;
  } catch {
    return '{}'; // JSON inválido
  }
}