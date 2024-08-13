import { Hono } from 'hono/tiny';
import { layout } from '../../middleware/layout';
import viewController from './controllers/view.controller';

const app = new Hono();

// Pages
app.use(layout({ isAuthenticated: false }));
app.get('/', viewController.homePage);
app.get('/editor', viewController.editor);

export default app;
