const mongoose = require("mongoose");
const Etudiant = require("../models/Etudiant.js"); // Chemin vers ton modèle Étudiant

// Connexion à MongoDB
mongoose.connect(
  "mongodb+srv://ayakandoussi:sesame@parascolaire.bzzso.mongodb.net/GestionPara?retryWrites=true&w=majority&appName=parascolaire");
const db = mongoose.connection;
db.once("open", async () => {
  console.log("Connecté à MongoDB pour le test.");
  // Création d’un étudiant
  const nouvelEtudiant = new Etudiant({
    nom: "Bouchama",
    prenom: "Aya",
    email: "aya.bouchama@enim.ac.ma",
    motDePasse: "sesame",
    clubs: [],
    evenementsParticipes: [],
    evenementsAVenir: [],
  });
  try {
    const result = await nouvelEtudiant.save(); // Sauvegarde dans la base de données
    console.log("Étudiant créé avec succès :", result);
  } catch (error) {
    console.error("Erreur lors de la création de l'étudiant :", error.message);
  } finally {
    db.close(); // Ferme la connexion
  }
});