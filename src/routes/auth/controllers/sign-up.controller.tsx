import { Context } from 'hono';
import authService from '../services/auth.service';
import EmailVerificationCTA from '../views/EmailVerificationCTA';

async function signUpWithEmail(c: Context) {
  const { email, password } = await c.req.parseBody();

  const { error } = await authService.signUpWithEmail(
    c,
    email as string,
    password as string
  );

  if (error == null) {
    return c.render(<EmailVerificationCTA />);
  }

  return c.redirect('/auth/error');
}

export default { signUpWithEmail };
