const { Todo } = require('../models/todo');

/* This is a function that is being exported to the routes.js file. */
exports.getTodos = async (req, res) => {
    try {
        const todo = await Todo.find();

        if(!todo) {
            return res.status(404).json({
                message: 'todos not found',
            });
        }
        res.json(todo);

    } catch (err) {
         res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if(!todo) {
            return res.status(404).json({
                message: 'todo not found',
            });
        }
        res.json(todo);

    } catch (err) {
         res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

exports.createTodo = async (req, res) => {
    try {
        const todo = await Todo.create(req.body);

        res.status(201).json({
            status: 'success',
            data: todo,
            
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

exports.updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            completed: req.body.completed,
            completedAt: req.body.completedAt,
        }, {
            new: true,
        });

        if(!todo) {
            return res.status(404).json({
                message: 'todo not found',
            });
        }
        res.json(todo);

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
            });
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);

        if(!todo) {
            return res.status(404).json({
                message: 'todo not found',
            });
        }
        res.json(todo);

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}