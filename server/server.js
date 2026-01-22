import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/todos', todoRoutes);

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'API Todo List MERN Stack' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Canged to - Serveur démarré sur le port ${PORT}`);
  console.log(`📍 API disponible sur http://localhost:${PORT}/api/todos`);
});
