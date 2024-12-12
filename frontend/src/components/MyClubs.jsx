import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterListIcon from "@mui/icons-material/FilterList";

const MyClubs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [anchorEl, setAnchorEl] = useState(null);
  const [clubs, setClubs] = useState([]); // State to store fetched clubs
  const [isLoading, setIsLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchClubs = async () => {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Utilisateur non authentifié.');
        return;
      }

      try {
        const response = await fetch('http://localhost:7000/api/clubs/myClubs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des clubs.');
        }

        const data = await response.json();
        setClubs(data); 
      } catch (error) {
        console.error("Error fetching clubs:", error);
        setError(error.message); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchClubs();
  }, []); 

  // ... (rest of your component code: filtering, handlers, etc.)

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* ... (search and filter) */}

      {/* Display error message if any */}
      {error && <Typography color="error">{error}</Typography>}

      {/* Display clubs */}
      {isLoading ? (
        <Typography>Loading clubs...</Typography> 
      ) : filteredClubs.length > 0 ? (
        filteredClubs.map((club, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "40px", 
              position: "relative",
              cursor: "pointer", 
            }}
            onClick={() => handleRectangleClick(club.name)} 
          >
            {/* Club Image */}
            <img
              src={`/imagesClubs/${club.image}`} // Assuming your backend serves images
              alt={`${club.nom} Logo`}
              style={{
                maxWidth: "80px",
                maxHeight: "80px",
                borderRadius: "50%",
                position: "absolute",
                left: "-60px", 
              }}
            />

            {/* Club Name in Rectangle */}
            <Box
              sx={{
                backgroundColor: "#F0F0F0", 
                padding: "10px 20px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "300px", 
                marginLeft: "50px", 
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>{club.nom}</Typography>
            </Box>
          </Box>
        ))
      ) : (
        <Typography>Aucun club correspondant trouvé</Typography>
      )}
    </Box>
  );
};

export default MyClubs;
