const express = require('express');
const router = express.Router();
const { createTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todocontroller');
const { authTodoUser } = require('../middlewares/auth.middlewares');



router.post('/create', authTodoUser, createTodo);
router.get('/all', authTodoUser, getTodos);
router.put('/update/:id', authTodoUser, updateTodo);
router.delete('/delete/:id', authTodoUser, deleteTodo);

module.exports = router;
