import { Hono } from 'hono';
import { layout } from '../../middleware/layout';
import { authMiddleware } from '../../middleware/auth';
import tasksController from './controllers/tasks.controller';
import viewController from './controllers/view.controller';

const app = new Hono();

// Middleware
app.use(authMiddleware);

// Handlers
app.get('/', viewController.tasksTable);
app.post('/', tasksController.createNewTask);
app.delete('/:id', tasksController.deleteTaskById);
app.put('/:id', tasksController.updateTaskById);

// Pages
app.use(layout());
app.get('/dashboard', viewController.dashboard);
app.get('/new', viewController.newTask);
app.get('/:id/edit', viewController.editTask);

export default app;
