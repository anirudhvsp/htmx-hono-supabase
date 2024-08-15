// Library Imports
import { Hono } from 'hono/tiny';
import { logger } from 'hono/logger';
import { env } from 'hono/adapter';
import { SupabaseClient } from '@supabase/supabase-js';
import { cors } from 'hono/cors'
// Middleware Imports
import { supabaseMiddleware } from './middleware/supabase';

import { layout } from './middleware/layout';
import handle404 from './middleware/handle404';
import handleError from './middleware/handleError';

// Router Imports
import homeRouter from './routes/home';
import tasksRouter from './routes/tasks';
import chatRouter from './routes/chat';
import authRouter from './routes/auth';
import invoiceRouter from './routes/invoices';


// c.var types
type Variables = {
  client: SupabaseClient;
};

// c.env types
type Bindings = {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
};

const app = new Hono<{ Variables: Variables; Bindings: Bindings }>();
app.use('*', cors({
  origin: "http://localhost:3074",
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'hx-request', "hx-target", 'hx-current-url'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}))

// Middleware
app.use(logger());
// Handlers
app.get('/', (c) => c.redirect('/home'));
app.get('/env', (c) => c.json(env(c))); // TODO: Remove later, this is only for debugging purposes to test wrangler.toml environments

// Routes
app.use(supabaseMiddleware);
app.route('/auth', authRouter);
app.route('/home', homeRouter);
app.route('/tasks', tasksRouter);
app.route('/chat', chatRouter);
app.route('/invoices', invoiceRouter);

// Error Handlers
app.use(layout({ isAuthenticated: false }));
app.get('/error', (_) => {
  // TODO: Remove later, this is only for debugging purposes to test thrown Error handling
  throw new Error('Some error happened!');
});
app.notFound(handle404);
app.onError(handleError);

export default app;
