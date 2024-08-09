import { Context } from 'hono';
import HomePage from '../views/HomePage';
import Editor from '../views/Editor';

async function homePage(c: Context) {
  return c.render(<HomePage />);
}

async function editor(c: Context) {
  return c.render(<Editor />);
}

export default { homePage, editor };
