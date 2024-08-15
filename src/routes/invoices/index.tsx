import { Hono } from 'hono/tiny';
import { layout } from '../../middleware/layout';
import { authMiddleware } from '../../middleware/auth';
import invoicesController from './controllers/invoices.controller';
import viewController from './controllers/view.controller';

const app = new Hono();

// Middleware
app.use(authMiddleware);

// Handlers
app.get('/', invoicesController.getInvoices);
app.post('/', invoicesController.createInvoice);
// app.get('/:id', invoicesController.getInvoiceById);
app.put('/:id', invoicesController.updateInvoice);
app.delete('/:id', invoicesController.deleteInvoice);

// Pages
app.get('/dashboard', viewController.dashboard);

export default app;
