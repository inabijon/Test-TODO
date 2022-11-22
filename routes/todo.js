const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const TodoController = require("../controller/todo");

/* A route handler. It is a function that will be called when the user navigates to the `/` route. */
router.get('/', TodoController.getTodos);
router.get('/:id', TodoController.getTodo);
router.post('/', auth, TodoController.createTodo);
router.put('/:id', auth, TodoController.updateTodo);
router.delete('/:id', auth, TodoController.deleteTodo);

module.exports = router;
