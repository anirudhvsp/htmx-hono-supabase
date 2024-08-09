import { Context } from 'hono';
import AuthLoginPage from '../views/AuthLoginPage';
import authService from '../services/auth.service';
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
      setCookie(c, 'auth_session', data.session?.access_token, {
        httpOnly: true,
        secure: true,
        maxAge: 3456,
        sameSite: 'Lax',
        path: '/'
      });
      return c.redirect('/tasks/dashboard');
    }

  return c.redirect('/auth/error');
}
}


async function handleOAuthCallback(c: Context) {
  const code = c.req.query('code');
  const next = c.req.query('next') ?? '/tasks/dashboard';

  if (code !== undefined) {
    const { error } = await c.var.supabase.auth.exchangeCodeForSession(code);
    if (error === null) {
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
};
