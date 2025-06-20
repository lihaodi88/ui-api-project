const express = require('express');
const router = express.Router();
const Todo = require('../models/todo-model.js');

// Get all todos
router.get('/', async (req, res) => {
  console.log(`[API] GET /api/todos called at ${new Date().toISOString()}`);
  const todos = await Todo.find();
  res.json(todos);
});

// Create a todo
router.post('/', async (req, res) => {
  console.log(`[API] POST /api/todos called at ${new Date().toISOString()}`);
  const { text } = req.body;
  const newTodo = new Todo({ text });
  const savedTodo = await newTodo.save();
  console.log(`[DB] New todo saved with id ${savedTodo._id} at ${new Date().toISOString()}`);
  res.json(savedTodo);
});

// Toggle completed
router.put('/:id', async (req, res) => {
  console.log(`[API] PUT /api/todos/${req.params.id} called at ${new Date().toISOString()}`);
  const todo = await Todo.findById(req.params.id);
  todo.completed = !todo.completed;
  const updated = await todo.save();
  console.log(`[DB] Todo ${updated._id} updated (completed=${updated.completed}) at ${new Date().toISOString()}`);
  res.json(updated);
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  console.log(`[API] DELETE /api/todos/${req.params.id} called at ${new Date().toISOString()}`);
  await Todo.findByIdAndDelete(req.params.id);
  console.log(`[DB] Todo ${req.params.id} deleted at ${new Date().toISOString()}`);
  res.json({ success: true });
});

module.exports = router;
