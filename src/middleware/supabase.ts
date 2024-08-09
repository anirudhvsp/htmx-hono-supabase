import { createServerClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { MiddlewareHandler, Context } from 'hono';
import { getCookie, setCookie, deleteCookie } from 'hono/cookie';
import { env } from 'hono/adapter';

export const supabaseMiddleware: MiddlewareHandler<{
  Variables: {
    supabase: SupabaseClient;
  };
}> = async (c: Context, next) => {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = env(c);

  const client = createServerClient(
    SUPABASE_URL ?? '',
    SUPABASE_ANON_KEY ?? '',
    {
      cookies: {
        get: (key: string) => {
          return getCookie(c, key);
        },
        set: (key: string, value: any, options: object) => {
          setCookie(c, key, value, {
            httpOnly: true,
            secure: true,
            maxAge: 3456,
            sameSite: 'Lax',
            path: '/'
          });
        },
        remove: (key: string, options: object) => {
          deleteCookie(c, key, options);
        },
      },
      cookieOptions: {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24, // 1 days in seconds
      },
    }
  );
  c.set('supabase', client);
  await next();
};
