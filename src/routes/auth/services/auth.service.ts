import { Context } from 'hono';
import { env } from 'hono/adapter';

async function signUpWithEmail(c: Context, email: string, password: string) {
  const { BASE_URL } = env(c);

  const { error } = await c.var.supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${BASE_URL}/auth/login` },
  });

  return { error };
}

async function loginWithEmail(c: Context, email: string, password: string) {
  const { BASE_URL } = env(c);

  const {
    data: { user },
  } = await c.var.supabase.auth.signInWithPassword({
    email,
    password,
    options: { redirectTo: `${BASE_URL}/tasks/dashboard` },
  });

  return user;
}

async function loginWithGoogle(c: Context) {
  const { BASE_URL } = env(c);

  const {
    data: { url: googleLoginURL },
  } = await c.var.supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${BASE_URL}/auth/callback`,
    },
  });

  return { googleLoginURL };
}

async function logoutSession(c: Context) {
  await c.var.supabase.auth.signOut();
}

export default {
  signUpWithEmail,
  logoutSession,
  loginWithEmail,
  loginWithGoogle,
};
