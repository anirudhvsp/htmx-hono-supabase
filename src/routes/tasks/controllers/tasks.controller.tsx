import { Context } from 'hono';
import tasksService from '../services/tasks.service';
import SuccesfulEdit from '../views/SuccessfulEdit';
import { TaskSchema, Task } from '../models/task.model';
import Row from '../views/Row';

async function deleteTaskById(c: Context) {
  const idToDelete = c.req.param('id');
  await tasksService.deleteTaskById(c, idToDelete);

  c.status(204);
  return c.body(null);
}

async function changeStatusById(c: Context) {
  const idToDelete = c.req.param('id');
  const t = await tasksService.changeStatusById(c, idToDelete);

  return c.render(<Row {...t} />);
}

async function createNewTask(c: Context) {
  const formData = await c.req.parseBody();

  const newTaskData: Omit<Task, 'id'> = TaskSchema.omit({id: true}).parse(formData);

  await tasksService.createTask(c, newTaskData);

  return c.redirect('/tasks/dashboard');
}

async function updateTaskById(c: Context) {
  const idToUpdate = c.req.param('id');
  const formData = await c.req.parseBody();

  const updatedTaskData: Omit<Task, 'id'> = TaskSchema.omit({id: true}).parse(formData);
  
  await tasksService.updateTask(c, idToUpdate, updatedTaskData);

  return c.render(<SuccesfulEdit />);
}

export default {
  createNewTask,
  deleteTaskById,
  updateTaskById,  
  changeStatusById,
};
