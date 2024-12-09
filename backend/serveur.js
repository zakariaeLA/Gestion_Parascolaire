const express = require('express');
const bodyParser = require("body-parser");
const connexionRoute = require("./routes/connexion");
const clubRoutes = require('./routes/clubRoutes'); // Import des routes étudiants
const jwt = require("jsonwebtoken")

const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });
const path = require('path');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 7000;




app.use(cors()); // This allows all origins by default

// Serve static files (images) from the 'public/images' folder
app.use('/imagesClubs', express.static(path.join(__dirname, 'public', 'imagesClubs')));
// Route to serve an image based on its filename
app.get('/api/imagesClubs/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, 'public', 'imagesClub', imageName);
    res.sendFile(imagePath, (err) => {
        if (err) {
            res.status(404).send('Image not found');
        }
    });
});


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Utilisation de la route de connexion
app.use("/api", connexionRoute);
app.use('/api/clubs', clubRoutes);

// Connexion à MongoDB Atlas
const uri = process.env.MONGO_URI;
mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

  app.get("/", (req, res) => {
    res.send("Backend is working and connected to MongoDB!");
  });

// Start the server
app.listen(port, () => {
    console.log("Server is running on port: http://localhost:7000");
});