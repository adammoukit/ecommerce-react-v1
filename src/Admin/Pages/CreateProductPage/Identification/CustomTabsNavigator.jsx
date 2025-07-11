import { Button } from "@mui/material";
import React from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

const CustomTabsNavigator = ({ value, handleSuivant, handlePrev, productData }) => {
  const handleSubmit = () => {
    console.log("Données finales:", productData);
    // Envoyer les données à l'API
  };

  return (
    <div className="flex justify-between  px-6">
      <Button variant="outlined">Annuler</Button>

      <div className="flex gap-2 items-center justify-center">
        {value !== "1" && (
          <Button
            onClick={handlePrev}
            sx={{ color: "black" }}
            variant="outlined"
          >
            <ArrowCircleLeftIcon />
          </Button>
        )}
        {value !== "5" && (
          <Button
            onClick={handleSuivant}
            sx={{ bgcolor: "orange", color: "white" }}
            variant="outlined"
          >
            <ArrowCircleRightIcon />
          </Button>
        )}

        {value === "5" && (
          <Button
            onClick={handleSubmit}
            sx={{ bgcolor: "green", fontWeight: "bold", color: "white" }}
            variant="outlined"
          >
            Créer le produit
          </Button>
        )}
      </div>
    </div>
  );
};

export default CustomTabsNavigator;
