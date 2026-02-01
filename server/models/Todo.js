import mongoose from 'mongoose';

// Schéma Mongoose pour Todo
const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Modèle Todo
const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
