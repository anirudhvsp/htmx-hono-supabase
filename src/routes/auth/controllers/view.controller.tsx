import { Context } from 'hono';
import AuthErrorPage from '../views/AuthErrorPage';
import AuthLoginPage from '../views/AuthLoginPage';
import AuthSignUpPage from '../views/AuthSignUpPage';

function authError(c: Context) {
  return c.render(<AuthErrorPage />);
}

function authLogin(c: Context) {
  return c.render(<AuthLoginPage />);
}

function authSignUp(c: Context) {
  return c.render(<AuthSignUpPage />);
}

export default { authError, authLogin, authSignUp };
