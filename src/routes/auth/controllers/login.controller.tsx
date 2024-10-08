import { Context } from 'hono';
import AuthLoginPage from '../views/AuthLoginPage';
import authService from '../services/auth.service';
import { env } from 'hono/adapter';
import { setCookie } from 'hono/cookie';
async function loginWithEmail(c: Context) {
  const { email, password } = await c.req.parseBody();

  const user = await authService.loginWithEmail(
    c,
    email as string,
    password as string
  );

  if (user !== null) {
    return c.redirect('/tasks/dashboard');
  }

  return c.render(<AuthLoginPage isInvalid={true} />);
}

async function loginWithGoogle(c: Context) {
  const { credential, g_csrf_token } = await c.req.parseBody();
  if (credential && g_csrf_token) {
    const { data, error } = await c.var.supabase.auth.signInWithIdToken({
      provider: 'google',
      token: credential,
    });

    if (error === null && data.user) {
      const { id, email, user_metadata } = data.user
      const name = user_metadata.full_name || 'Unknown'
      const profile_picture_url = user_metadata.picture || ''

      const { error: upsertError } = await c.var.supabase
        .from('user_profiles')
        .upsert({
          id,
          email,
          name,
          profile_picture_url,
          updated_at: new Date().toISOString(),
        })

      if (upsertError) {
        console.error(`Error upserting user profile: ${upsertError.message}`)
        return c.redirect('/auth/error')
      }

      setCookie(c, 'auth_session', data.session?.access_token, {
        httpOnly: true,
        secure: true,
        maxAge: 3456,
        sameSite: 'Lax',
        path: '/'
      });
      return c.redirect('/home');
    }

  return c.redirect('/auth/error');
}
}

async function loginWithCustomProvider(c: Context) {
  const body = await c.req.json();
  const credential = body.credential;
  if (credential) {
    const { data, error } = await c.var.supabase.auth.signInWithIdToken({
      provider: 'google',
      token: credential
    })

    if (error === null && data.user) {
      const { id, email, user_metadata } = data.user
      const name = user_metadata.full_name || 'Unknown'
      const profile_picture_url = user_metadata.picture || ''

      const { error: upsertError } = await c.var.supabase
        .from('user_profiles')
        .upsert({
          id,
          email,
          name,
          profile_picture_url,
          updated_at: new Date().toISOString(),
        })

      if (upsertError) {
        console.error(`Error upserting user profile: ${upsertError.message}`)
        return c.json({ error: 'Authentication failed' }, 500)
      }

      const authHeader = `Bearer ${data.session?.access_token}`
      return c.json({ authHeader }, 200)
    }
  }

  return c.json({ error: 'Authentication failed' }, 400)
}


async function handleOAuthCallback(c: Context) {
  const code = c.req.query('code');
  const next = c.req.query('next') ?? '/tasks/dashboard';
  if (code !== undefined) {
    const { data: { session }, error } = await c.var.supabase.auth.exchangeCodeForSession(code);
    if (error === null && session) {
      const user = session.user;
      const { id, email, user_metadata } = user;
      const name = user_metadata.full_name || 'Unknown';
      const profile_picture_url = user_metadata.picture || '';

      const { error: upsertError } = await c.var.supabase
        .from('user_profiles')
        .upsert({
          id,
          email,
          name,
          profile_picture_url,
          updated_at: new Date().toISOString(),
        });

      if (upsertError) {
        console.error(`Error upserting user profile: ${upsertError.message}`);
        return c.redirect('/auth/error');
      }

      return c.redirect(next);
    }
  }

  return c.redirect('/auth/error');
}

async function logoutSession(c: Context) {
  await authService.logoutSession(c);
  return c.redirect('/auth/login');
}

export default {
  loginWithEmail,
  loginWithGoogle,
  handleOAuthCallback,
  logoutSession,
  loginWithCustomProvider
};
