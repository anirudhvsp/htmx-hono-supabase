import { Context } from 'hono';

async function getAllTasks(c: Context): Promise<Task[]> {
  const { data: tasks, error } = await c.var.supabase.from('tasks').select();

  if (error) {
    throw error;
  }

  return tasks;
}

async function getTaskById(c: Context, id: string): Promise<Task> {
  const { data: results, error } = await c.var.supabase
    .from('tasks')
    .select()
    .eq('id', id);

  if (error) {
    throw error;
  }

  return results[0];
}

async function deleteTaskById(c: Context, id: string): Promise<void> {
  const { error } = await c.var.supabase.from('tasks').delete().eq('id', id);
  if (error) {
    throw error;
  }
}

async function changeStatusById(c: Context, id: string): Promise<Task> {
  const { data: results, e1 } = await c.var.supabase.from('tasks').select().eq('id', id);
  const { error } = await c.var.supabase.from('tasks').update({ completed : !results[0].completed }).eq('id', id);
  if (error) {
    throw error;
  }
  results[0].completed = !results[0].completed;
  return results[0];
}

async function updateTitleById(c: Context, id: string, newTitle : string) {
  const { results ,error } = await c.var.supabase
    .from('tasks')
    .update({ title : newTitle })
    .eq('id', id).select();

  if (error) {
    throw error;
  }
  const t = await getTaskById(c, id); 
  return t;
}

async function changeStatusById(c: Context, id: string): Promise<Task> {
  const { data: results, e1 } = await c.var.supabase.from('tasks').select().eq('id', id);
  const { error } = await c.var.supabase.from('tasks').update({ completed : !results[0].completed }).eq('id', id);
  if (error) {
    throw error;
  }
  results[0].completed = !results[0].completed;
  return results[0];
}

async function createTask(c: Context, task: Omit<Task, 'id'>) {
  const { data: results, error } = await c.var.supabase.from('tasks').insert(task).select('*');

  if (error) {
    console.error(error);
    throw error;
  }       
}

async function updateTask(c: Context, id: string, task: Omit<Task, 'id'>) {
  const { error } = await c.var.supabase
    .from('tasks')
    .update({ ...task })
    .eq('id', id);

  if (error) {
    throw error;
  }
}

export default {
  getAllTasks,
  getTaskById,
  deleteTaskById,
  createTask,
  updateTask, 
  changeStatusById,
  updateTitleById,
};
