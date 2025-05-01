import { createBrowserClient } from '@supabase/ssr'

let client: ReturnType<typeof createBrowserClient>

export const supabaseBrowser = () => {
  if (client) return client

  client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // (bug do warning de getSession)
  (client.auth as any).suppressGetSessionWarning = true

  return client
}