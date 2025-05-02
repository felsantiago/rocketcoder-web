import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export function AuthCallback() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error:', error.message);
        return;
      }

      if (session) {
        // Redirect to desktop app with tokens
        window.location.href = `codewingman://auth/callback?access_token=${session.access_token}&refresh_token=${session.refresh_token}`;
      }
    };

    handleAuthCallback();
  }, [supabase, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl font-semibold">Redirecting to Rocket Coder...</h1>
        <p className="mt-2 text-sm text-gray-500">Please wait while we redirect you to the desktop app.</p>
      </div>
    </div>
  );
}