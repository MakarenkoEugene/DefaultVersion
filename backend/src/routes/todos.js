const express = require('express');
const router = express.Router();

const Todo = require('../models/todo');

router.get('/', async (req, res) => {
  const todos = await Todo.find({ isComplete: false });

  res.send(todos);
});

router.get('/:id', async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id });

  res.send(todo);
});

router.post('/', async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    isComplete: req.body.isComplete || false,
    dueDate: req.body.dueDate || new Date(),
  });
  await todo.save();
  res.send(todo);
});

router.patch('/:id', async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id });

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
});

router.delete('/:id', async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id });

    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: 'Todo does not exist!' });
  }
});

module.exports = router;
