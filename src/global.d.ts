import {} from 'hono';

declare module 'hono' {
  interface ContextRenderer {
    (content: string | Promise<string>, props?: { title?: string }): Response;
  }
}

/* Globally available types without using explicit imports */
declare global {
  interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    due_date: string;
  }
}
