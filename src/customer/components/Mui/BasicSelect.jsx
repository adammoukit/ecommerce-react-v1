import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const SizeButton = styled(Button)(({ theme, selected, instock }) => ({
  minWidth: 40,
  margin: theme.spacing(0.5),
  border: `1px solid ${instock === "true" ? "#e0e0e0" : "#ffcccc"}`,
  fontWeight: selected ? "bold" : "normal",
  backgroundColor: selected ? theme.palette.primary.main : 
                instock === "true" ? "#ffffff" : "#fafafa",
  color: selected ? "#fff" : 
        instock === "true" ? theme.palette.text.primary : "#bdbdbd",
  "&:hover": {
    backgroundColor: instock === "true" ? 
      (selected ? theme.palette.primary.dark : "#f5f5f5") : "#fafafa"
  },
  position: "relative",
  overflow: "hidden",
}));

const BasicSelect = ({ name, options, variantStock, onSelect }) => {
  const [selectedSize, setSelectedSize] = React.useState("");

  const handleSizeClick = (size) => {
    if (variantStock > 0) {
      setSelectedSize(size);
      onSelect(size);
    }
  };

  const getStockForSize = (size) => {
    // À adapter selon votre logique métier si le stock est géré par taille
    return variantStock; // Version simplifiée pour la structure actuelle
  };

  return (
    <Box sx={{ minWidth: 400, width: "100%", mt: 2 }}>
      <Chip 
        label={`Tailles disponibles - Stock total : ${variantStock}`} 
        variant="outlined" 
        sx={{ 
          mb: 1, 
          fontWeight: "bold",
          backgroundColor: variantStock > 0 ? "#e8f5e9" : "#ffebee",
          borderColor: variantStock > 0 ? "#c8e6c9" : "#ffcdd2"
        }} 
      />
      
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {options.map((size, index) => {
          const inStock = getStockForSize(size) > 0;
          const isLowStock = getStockForSize(size) <= 5;

          return (
            <Tooltip 
              key={index} 
              title={inStock ? 
                `${getStockForSize(size)} disponibles` : 
                "Taille épuisée"}
              arrow
            >
              <SizeButton
                variant="outlined"
                selected={selectedSize === size}
                instock={inStock.toString()}
                onClick={() => handleSizeClick(size)}
                disabled={!inStock}
              >
                {size}
                {isLowStock && inStock && (
                  <Box
                    component="span"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: 0,
                      height: 0,
                      borderLeft: "12px solid transparent",
                      borderBottom: "12px solid #ffd600",
                      zIndex: 1
                    }}
                  />
                )}
                {!inStock && (
                  <Box
                    component="span"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: "110%",
                      height: 1,
                      bgcolor: "rgba(255, 0, 0, 0.3)",
                      transform: "translate(-50%, -50%) rotate(-15deg)",
                      zIndex: 1
                    }}
                  />
                )}
              </SizeButton>
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
};

export default BasicSelect;