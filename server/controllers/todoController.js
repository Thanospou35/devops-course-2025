import Todo from '../models/Todo.js';

// Récupérer tous les todos
export const getAllTodos = (req, res) => {
  try {
    const todos = Todo.getAll();
    res.json({ success: true, data: todos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Récupérer un todo par ID
export const getTodoById = (req, res) => {
  try {
    const { id } = req.params;
    const todo = Todo.getById(id);
    
    if (!todo) {
      return res.status(404).json({ success: false, message: 'Todo non trouvé' });
    }
    
    res.json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Créer un nouveau todo
export const createTodo = (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || text.trim() === '') {
      return res.status(400).json({ success: false, message: 'Le texte du todo est requis' });
    }
    
    const todo = Todo.create(text.trim());
    res.status(201).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mettre à jour un todo
export const updateTodo = (req, res) => {
  try {
    const { id } = req.params;
    const { text, completed } = req.body;
    
    const todo = Todo.getById(id);
    if (!todo) {
      return res.status(404).json({ success: false, message: 'Todo non trouvé' });
    }
    
    const updates = {};
    if (text !== undefined) updates.text = text;
    if (completed !== undefined) updates.completed = completed;
    
    const updatedTodo = Todo.update(id, updates);
    res.json({ success: true, data: updatedTodo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Supprimer un todo
export const deleteTodo = (req, res) => {
  try {
    const { id } = req.params;
    const todo = Todo.delete(id);
    
    if (!todo) {
      return res.status(404).json({ success: false, message: 'Todo non trouvé' });
    }
    
    res.json({ success: true, message: 'Todo supprimé avec succès', data: todo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
