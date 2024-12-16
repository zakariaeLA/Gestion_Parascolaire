const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth'); // Middleware d'authentification
const Club = require('../models/Club'); // Modèle du club
const Etudiant = require('../models/Etudiant'); // Modèle de l'étudiant

// Route pour rejoindre un club avec des informations supplémentaires
router.post('/:id/rejoindre', authMiddleware, async (req, res) => {
    const etudiantId = req.user.id; // Récupérer l'ID de l'étudiant depuis le token
    const { nom, prenom, niveauEtude, motivation } = req.body; // Récupérer les données du formulaire

    try {
        const club = await Club.findById(req.params.id);
        if (!club) {
            return res.status(404).send({ message: 'Club non trouvé' });
        }

        // Vérifiez si l'étudiant est déjà membre du club
        if (!club.membres.includes(etudiantId)) {
            club.membres.push(etudiantId); // Ajoutez l'étudiant à la liste des membres

            // Vous pouvez également enregistrer les informations supplémentaires si nécessaire
            const etudiant = await Etudiant.findById(etudiantId);
            etudiant.clubs.push({
                clubId: club._id,
                nom,
                prenom,
                niveauEtude,
                motivation
            });
            await etudiant.save();

            await club.save();
            return res.status(200).send({ message: 'Inscription au club réussie', club });
        } else {
            return res.status(400).send({ message: 'Vous êtes déjà membre de ce club' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erreur lors de l\'inscription au club', error });
    }
});

module.exports = router;