import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const BasicSelect = ({ name, options = [], onSelect }) => {
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (onSelect) onSelect(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 400, width: "100%" }}>
      <FormControl fullWidth>
        <InputLabel id="basic-select-label">{name}</InputLabel>
        <Select
          labelId="basic-select-label"
          id="basic-select"
          value={selectedValue}
          label={name}
          onChange={handleChange}
        >
          {options.length > 0 ? (
            options.map((option, index) => (
              // Assurez-vous d'afficher la propriété 'size' ici
              <MenuItem key={index} value={option.size}>
                {option.size}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="" disabled>
              Aucune taille disponible
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BasicSelect;
