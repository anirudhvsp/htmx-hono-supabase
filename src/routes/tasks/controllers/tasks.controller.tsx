import { Context } from 'hono';
import tasksService from '../services/tasks.service';
import SuccesfulEdit from '../views/SuccessfulEdit';
import { TaskSchema, Task } from '../models/task.model';
import Row from '../views/Row';
import EditBox from '../views/editTextBox';

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


async function editTitle(c: Context) {
  const idToEdit = c.req.param('id');
  const task = await tasksService.getTaskById(c, idToEdit); // Fetch the task data

  return c.render(<EditBox id={task.id} taskTitle={task.title} />);
}


async function titleSuccess(c: Context) {
  const idToEdit = c.req.param('id');
  const formData = await c.req.parseBody();
  const t = await tasksService.updateTitleById(c, idToEdit, formData.title); 
  return c.render(<Row {...t} />);
}

async function titleFaliure(c: Context) {
  const idToEdit = c.req.param('id');
  const t = await tasksService.getTaskById(c, idToEdit);
  return c.render(<Row {...t} />);

}

export default {
  createNewTask,
  deleteTaskById,
  updateTaskById,
  changeStatusById,
  editTitle,
  titleSuccess,
  titleFaliure,
};
