// Library Imports
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { env } from 'hono/adapter';
import { SupabaseClient } from '@supabase/supabase-js';

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

// Error Handlers
app.use(layout({ isAuthenticated: false }));
app.get('/error', (_) => {
  // TODO: Remove later, this is only for debugging purposes to test thrown Error handling
  throw new Error('Some error happened!');
});
app.notFound(handle404);
app.onError(handleError);

export default app;
