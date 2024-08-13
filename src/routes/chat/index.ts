import { Hono } from 'hono/tiny';
import { layout } from '../../middleware/layout';
import { authMiddleware } from '../../middleware/auth';
import viewController from './controllers/view.controller';
import chatController from './controllers/chat.controller';

const app = new Hono();

// Middleware
app.use(authMiddleware);

app.get('/user/:userId', chatController.getChatWindow);
// Handlers
app.get('/', chatController.getChatList);
app.get('/:userId/window', chatController.getChatWindow);
app.post('/new', chatController.startNewChat);
app.post('/send-message', chatController.sendMessage);
app.get('/sse/:userId', chatController.setupSSE);

// Pages
app.use(layout());
app.get('/dashboard', viewController.dashboard);

export default app;
