# 📝 Todo List MERN Stack

Un mini projet de todo list utilisant la stack MERN (MongoDB, Express, React, Node.js) avec stockage en mémoire (pas de base de données).

## 🏗️ Structure du Projet

```
devopss/
├── client/          # Frontend React avec Tailwind CSS
│   └── src/
│       ├── App.jsx  # Composant principal
│       └── ...
└── server/          # Backend Express
    ├── models/      # Modèles (Todo.js)
    ├── controllers/ # Contrôleurs (todoController.js)
    ├── routes/      # Routes API (todoRoutes.js)
    └── server.js    # Point d'entrée du serveur
```

## 🚀 Installation et Démarrage

### Backend (Serveur)

1. Aller dans le dossier server :
```bash
cd server
```

2. Installer les dépendances :
```bash
npm install
```

3. Démarrer le serveur :
```bash
# Mode développement (avec nodemon)
npm run dev

# Mode production
npm start
```

Le serveur démarre sur `http://localhost:5000`

### Frontend (Client)

1. Aller dans le dossier client :
```bash
cd client
```

2. Installer les dépendances :
```bash
npm install
```

3. Démarrer l'application :
```bash
npm run dev
```

L'application démarre sur `http://localhost:5173` (ou un autre port si 5173 est occupé)

## 📡 API Endpoints

- `GET /api/todos` - Récupérer tous les todos
- `GET /api/todos/:id` - Récupérer un todo par ID
- `POST /api/todos` - Créer un nouveau todo
- `PUT /api/todos/:id` - Mettre à jour un todo
- `DELETE /api/todos/:id` - Supprimer un todo

## 🎨 Fonctionnalités

- ✅ Ajouter des tâches
- ✅ Marquer les tâches comme complétées/non complétées
- ✅ Supprimer des tâches
- ✅ Interface moderne avec Tailwind CSS
- ✅ Stockage en mémoire (les données sont perdues au redémarrage du serveur)

## 📦 Technologies Utilisées

- **Backend**: Node.js, Express.js
- **Frontend**: React.js, Tailwind CSS, Axios
- **Architecture**: MVC (Models, Views, Controllers)
