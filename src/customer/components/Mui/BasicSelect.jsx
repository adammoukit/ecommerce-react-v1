import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const SizeButton = styled(Button)(({ theme, selected, instock }) => ({
  minWidth: 40,
  margin: theme.spacing(0.5),
  border: `2px solid ${instock === "true" ? "#e0e0e0" : "#ffcccc"}`,
  fontWeight: selected ? "bold" : "normal",
  backgroundColor: selected
    ? theme.palette.primary.main
    : instock === "true"
    ? "#ffffff"
    : "#fafafa",
  color: selected
    ? "#fff"
    : instock === "true"
    ? theme.palette.text.primary
    : "#bdbdbd",
  "&:hover": {
    backgroundColor:
      instock === "true"
        ? selected
          ? theme.palette.primary.dark
          : "#f5f5f5"
        : "#fafafa",
  },
  position: "relative",
  overflow: "hidden",
}));

// Dans BasicSelect.jsx
const BasicSelect = ({ name, options, onSelect }) => {
  const [selectedSize, setSelectedSize] = useState("");

  const handleSizeClick = (size) => {
    const stock = options.find((opt) => opt.size === size)?.stock || 0;
    if (stock > 0) {
      setSelectedSize(size);
      onSelect(size);
    }
  };

  return (
    <Box sx={{ minWidth: 400 }}>
    

      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {options.map((opt, index) => {
          const inStock = opt.stock > 0;
          const isLowStock = opt.stock <= 5;

          return (
            <Tooltip
              key={index}
              title={inStock ? `${opt.stock} disponibles` : "Taille épuisée"}
              arrow
            >
              <SizeButton
                variant="outlined"
                selected={selectedSize === opt.size}
                instock={inStock.toString()}
                onClick={() => handleSizeClick(opt.size)}
                disabled={!inStock}
              >
                {opt.size}
                {/* Indicateurs visuels */}
              </SizeButton>
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
};

export default BasicSelect;
