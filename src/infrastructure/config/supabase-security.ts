import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

export const supabaseSecurityConfig = {
  // Session configuration
  session: {
    // Session duration in seconds (7 days)
    duration: 7 * 24 * 60 * 60,
    // Auto refresh session
    autoRefresh: true,
    // Detect session in URL
    detectSessionInUrl: true,
  },

  // Rate limiting configuration
  rateLimiting: {
    // Maximum number of requests per minute
    maxRequestsPerMinute: 60,
    // Maximum number of failed login attempts
    maxFailedLoginAttempts: 5,
    // Lockout duration in minutes
    lockoutDuration: 15,
  },

  // Password policy
  passwordPolicy: {
    // Minimum password length
    minLength: 8,
    // Require uppercase letters
    requireUppercase: true,
    // Require lowercase letters
    requireLowercase: true,
    // Require numbers
    requireNumbers: true,
    // Require special characters
    requireSpecialChars: true,
  },

  // CORS configuration
  cors: {
    // Allowed origins
    allowedOrigins: [
      process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    ],
    // Allow credentials
    allowCredentials: true,
  },

  // Security headers
  securityHeaders: {
    // Content Security Policy
    contentSecurityPolicy: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'https://*.supabase.co'],
    },
    // X-Frame-Options
    xFrameOptions: 'DENY',
    // X-Content-Type-Options
    xContentTypeOptions: 'nosniff',
    // Referrer Policy
    referrerPolicy: 'strict-origin-when-cross-origin',
  },
};

// Function to validate password strength
export const validatePasswordStrength = (password: string): boolean => {
  const { passwordPolicy } = supabaseSecurityConfig;

  if (password.length < passwordPolicy.minLength) return false;
  if (passwordPolicy.requireUppercase && !/[A-Z]/.test(password)) return false;
  if (passwordPolicy.requireLowercase && !/[a-z]/.test(password)) return false;
  if (passwordPolicy.requireNumbers && !/[0-9]/.test(password)) return false;
  if (passwordPolicy.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;

  return true;
};

// Function to check rate limit
export const checkRateLimit = async (
  supabase: SupabaseClient<Database>,
  userId: string,
  action: string
): Promise<boolean> => {
  const { data, error } = await supabase
    .rpc('check_rate_limit', {
      p_user_id: userId,
      p_action: action,
    });

  if (error) {
    console.error('Rate limit check failed:', error);
    return false;
  }

  return Boolean(data);
};