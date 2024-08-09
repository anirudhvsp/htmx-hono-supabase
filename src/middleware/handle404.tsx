import { Context } from 'hono';
import ErrorPage from '../views/ErrorPage';

export default function handle404(c: Context) {
  c.status(404);
  return c.render(
    <ErrorPage errorCode={404} errorMessage="We can't find that page." />
  );
}
