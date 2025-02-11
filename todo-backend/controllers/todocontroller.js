const TodoModel = require('../models/Todomodel');
const { createTodoSchema, updateTodoSchema, todoIdSchema } = require('../types/zod');

const createTodo = async (req, res) => {
    const parsedData = createTodoSchema.safeParse(req.body);
    console.log(parsedData); 

    if (!parsedData.success) {
        return res.status(400).json({ message: "Invalid input", errors: parsedData.error.errors });
    }

    try {
        const todo = await TodoModel.create({
            title: parsedData.data.title,
            description: parsedData.data.description,
            userId: req.user._id, 
        });

        res.status(201).json({ message: "Todo created", todo });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const getTodos = async (req, res) => {
    try {
        const todos = await TodoModel.find({ userId: req.user._id });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


const updateTodo = async (req, res) => {
    console.log("Received ID:", req.params.id);

    const parsedId = todoIdSchema.safeParse({ id: req.params.id });
    console.log("Parsed ID:", parsedId.success, parsedId.error?.errors);

    if (!parsedId.success) {
        return res.status(400).json({ message: "Invalid Todo ID", errors: parsedId.error.errors });
    }

    const parsedData = updateTodoSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({ message: "Invalid input", errors: parsedData.error.errors });
    }

    try {
        const todo = await TodoModel.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            parsedData.data,
            { new: true } 
        );

        if (!todo) {
            console.log("Todo not found:", req.params.id);
            return res.status(404).json({ message: "Todo not found" });
        }

        res.status(200).json({ message: "Todo updated", todo });
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "Server error", error });
    }
};


const deleteTodo = async (req, res) => {

    const parsedId = todoIdSchema.safeParse({ id: req.params.id });
    if (!parsedId.success) {
        return res.status(400).json({ message: "Invalid Todo ID", errors: parsedId.error.errors });
    }
   console.log(parsedId.data.id)
   console.log(req.user._id)
    try {
        const todo = await TodoModel.findOneAndDelete({ _id: parsedId.data.id , userId: req.user._id });

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.status(200).json({ message: "Todo deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { createTodo, getTodos, updateTodo, deleteTodo };
