import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const API_URL = 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Charger tous les todos au démarrage
  useEffect(() => {
    fetchTodos();
  }, []);

  // Récupérer tous les todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      if (response.data.success) {
        setTodos(response.data.data);
        setError('');
      }
    } catch (err) {
      setError('Erreur lors du chargement des todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Créer un nouveau todo
  const createTodo = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    try {
      setLoading(true);
      const response = await axios.post(API_URL, { text: inputText });
      if (response.data.success) {
        setTodos([...todos, response.data.data]);
        setInputText('');
        setError('');
      }
    } catch (err) {
      setError('Erreur lors de la création du todo');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Toggle complété/non complété
  const toggleTodo = async (id) => {
    try {
      const todo = todos.find(t => t.id === id);
      const response = await axios.put(`${API_URL}/${id}`, {
        completed: !todo.completed
      });
      if (response.data.success) {
        setTodos(todos.map(t => t.id === id ? response.data.data : t));
        setError('');
      }
    } catch (err) {
      setError('Erreur lors de la mise à jour du todo');
      console.error(err);
    }
  };

  // Supprimer un todo
  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      if (response.data.success) {
        setTodos(todos.filter(t => t.id !== id));
        setError('');
      }
    } catch (err) {
      setError('Erreur lors de la suppression du todo');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📝 Todo List
          </h1>
          <p className="text-gray-600">Gérez vos tâches facilement</p>
        </div>

        {/* Formulaire d'ajout */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <form onSubmit={createTodo} className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ajouter une nouvelle tâche..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !inputText.trim()}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              Ajouter
            </button>
          </form>
        </div>

        {/* Message d'erreur */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Liste des todos */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {loading && todos.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Chargement...
            </div>
          ) : todos.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Aucune tâche pour le moment. Ajoutez-en une !
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
                    />
                    <span
                      className={`flex-1 ${
                        todo.completed
                          ? 'line-through text-gray-500'
                          : 'text-gray-800'
                      }`}
                    >
                      {todo.text}
                    </span>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm font-medium"
                    >
                      Supprimer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Statistiques */}
        {todos.length > 0 && (
          <div className="mt-4 text-center text-gray-600">
            <p>
              {todos.filter(t => t.completed).length} / {todos.length} tâches
              complétées
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
