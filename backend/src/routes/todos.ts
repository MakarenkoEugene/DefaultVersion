import express, { Request, RequestHandler, Response } from 'express';
import Todo from '../models/todo';
import { isValidObjectId } from 'mongoose';

const router = express.Router();

router.get('/', (async (_req: Request, res: Response) => {
  const todos = await Todo.find({ isComplete: false });

  res.send(todos);
}) as RequestHandler);

router.get('/:id', (async (req: Request, res: Response) => {
  const todo = await Todo.findOne({ _id: req.params.id });

  res.send(todo);
}) as RequestHandler);

router.post('/', (async (req: Request<Record<string, unknown>, Record<string, unknown>, ApiTodo>, res: Response) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    isComplete: req.body.isComplete || false,
    dueDate: req.body.dueDate || new Date(),
  });

  await todo.save();

  res.send(todo);
}) as RequestHandler);

router.patch('/:id', (async (
  req: Request<Record<string, unknown>, Record<string, unknown>, ApiTodo>,
  res: Response,
) => {
  try {
    if (!isValidObjectId(req.params._id)) {
      res.sendStatus(400);
      return;
    }

    const todo = await Todo.findOne({ _id: req.params._id as string });

    if (todo === null) {
      res.sendStatus(400);
      return;
    }

    if (req.body.title) todo.title = req.body.title;
    if (req.body.description) todo.description = req.body.description;
    if (req.body.isComplete) todo.isComplete = req.body.isComplete;
    if (req.body.dueDate) todo.dueDate = req.body.dueDate;

    await todo.save();
    res.send(todo);
  } catch {
    res.status(404);
    res.send({ error: 'Todo does not exist!' });
  }
}) as RequestHandler);

router.delete('/:id', (async (req: Request, res: Response) => {
  try {
    await Todo.deleteOne({ _id: req.params.id });

    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: 'Todo does not exist!' });
  }
}) as RequestHandler);

export default router;
