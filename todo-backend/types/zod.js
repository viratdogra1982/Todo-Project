const { z } = require("zod");

const createTodoSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    description: z.string().min(5, "Description must be at least 5 characters long")
});

const updateTodoSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long").optional(),
    description: z.string().min(5, "Description must be at least 5 characters long").optional()
});

const todoIdSchema = z.object({
    id: z.string().length(24, "Invalid MongoDB ObjectId")
});

module.exports = {
    createTodoSchema,
    updateTodoSchema,
    todoIdSchema
};
