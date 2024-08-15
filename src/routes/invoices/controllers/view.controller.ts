import { Context } from 'hono';
import InvoiceDashboard from '../views/InvoiceDashboard';

async function dashboard(c: Context) {
  return c.render(InvoiceDashboard());
}

export default { dashboard };