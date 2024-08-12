import { Context } from 'hono';
import { html } from 'hono/html';
import ChatDashboard from '../views/ChatDashboard';

export async function dashboard(c: Context) {
  return c.render(ChatDashboard());
}

export default { dashboard };
