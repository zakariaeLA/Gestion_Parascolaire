const express = require('express');
const mongoose = require('mongoose');
const etudiantRoutes = require('./routes/etudiantRoutes');
const evenementRoutes = require('./routes/evenementRoutes');

// Initialisation de l'application Express
const app = express();
const PORT = process.env.PORT || 3000;


// Connexion à MongoDB
const connectDB = require('./config/db');
connectDB();



// Routes
app.use('/api/etudiants', etudiantRoutes);
app.use('/api/evenements', evenementRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

const cors = require('cors');
app.use(cors());  // Permet les requêtes cross-origin


module.exports = app;