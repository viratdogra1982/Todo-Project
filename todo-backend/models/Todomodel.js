const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true,
        minlength: [3, 'Title must be at least 3 characters long'],
    },
    description: {
        type: String,
        required: true,
        minlength: [5, 'Description must be at least 5 characters long'],
    },
    completed: {
        type: Boolean,
        default: false,
    },
    dueDate: {
        type: Date,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        required: true,
    }
}, { timestamps: true });

const TodoModel = mongoose.model('todo', todoSchema);

module.exports = TodoModel;
