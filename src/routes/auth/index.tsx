import { Hono } from 'hono';
import { layout } from '../../middleware/layout';
import signUpController from './controllers/sign-up.controller';
import loginController from './controllers/login.controller';
import viewController from './controllers/view.controller';

const app = new Hono();

app.use(layout({ isAuthenticated: false }));

app.get('/login', viewController.authLogin);
app.post('/login', loginController.loginWithEmail);
app.get('/login/google', loginController.loginWithGoogle);
app.post('/login/google', loginController.loginWithGoogle);
app.post('/sign-up', signUpController.signUpWithEmail);
app.get('/sign-up', viewController.authSignUp);
app.get('/callback', loginController.handleOAuthCallback);
app.post('/logout', loginController.logoutSession);
app.get('/error', viewController.authError);

export default app;
