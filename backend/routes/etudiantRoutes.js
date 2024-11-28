const express = require('express');
const Etudiant = require('../models/Etudiant');
const mongoose = require('mongoose');

const router = express.Router();

// Récupérer les informations d’un étudiant et ses événements
router.get('/:id/evenements', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'ID de l\'étudiant invalide.' });
  }
  try {
    const etudiant = await Etudiant.findById(req.params.id)
      .populate('evenementsParticipes')
      .populate('evenementsAVenir');
    if (!etudiant) {
        return res.status(404).json({ message: 'Étudiant non trouvé.' });
    }
    res.json(etudiant);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des données.' });
  }
});

// Ajouter d'autres routes ici si nécessaire

module.exports = router;
