import tasksService from '../services/tasks.service';
import Dashboard from '../views/Dashboard';
import CreateForm from '../views/CreateForm';
import EditForm from '../views/EditForm';
import Table from '../views/Table';
import { Context } from 'hono';
import { Task } from '../models/task.model';

async function tasksTable(c: Context) {
  const tasks: Task[] = await tasksService.getAllTasks(c);
  c.res.headers.append('HX-Trigger', 'taskListUpdated');
  return c.render(<Table tasks={tasks} />);
}

export async function dashboard(c: Context) {
  return c.render(<Dashboard />);
}

async function newTask(c: Context) {
  return c.render(<CreateForm />, { title: 'New Task' });
}

async function editTask(c: Context) {
  const idToEdit = c.req.param('id');
  const task = await tasksService.getTaskById(c, idToEdit);

  return c.render(<EditForm task={task} />, {
    title: 'Edit Task',
  });
}

export default { tasksTable, dashboard, newTask, editTask };
