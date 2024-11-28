const express = require('express');
const Evenement = require('../models/Evenement');
const mongoose = require('mongoose');

const router = express.Router();

// Récupérer les détails d’un événement
router.get('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'ID de l\'événement invalide.' });
  }
  try {
    const evenement = await Evenement.findById(req.params.id)
      .populate('participants')
      .populate('club');
    if (!evenement) {
        return res.status(404).json({ message: 'Événement non trouvé.' });
    }  
    res.json(evenement);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l’événement.' });
  }
});

// Ajouter d'autres routes ici si nécessaire

module.exports = router;
