// Modèle Todo - Stockage en mémoire
let todos = [];
let nextId = 1;

class Todo {
  constructor(id, text, completed = false) {
    this.id = id;
    this.text = text;
    this.completed = completed;
    this.createdAt = new Date();
  }

  // Récupérer tous les todos
  static getAll() {
    return todos;
  }

  // Récupérer un todo par ID
  static getById(id) {
    return todos.find(todo => todo.id === parseInt(id));
  }

  // Créer un nouveau todo
  static create(text) {
    const todo = new Todo(nextId++, text, false);
    todos.push(todo);
    return todo;
  }

  // Mettre à jour un todo
  static update(id, updates) {
    const todo = this.getById(id);
    if (todo) {
      if (updates.text !== undefined) todo.text = updates.text;
      if (updates.completed !== undefined) todo.completed = updates.completed;
      return todo;
    }
    return null;
  }

  // Supprimer un todo
  static delete(id) {
    const index = todos.findIndex(todo => todo.id === parseInt(id));
    if (index !== -1) {
      return todos.splice(index, 1)[0];
    }
    return null;
  }
}

export default Todo;
