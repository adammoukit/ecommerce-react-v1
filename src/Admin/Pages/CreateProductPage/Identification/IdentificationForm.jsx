import {
  Button,
  Checkbox,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const IdentificationForm = ({ data, updateData }) => {
  const handleChange = (field) => (e) => {
    updateData(field, e.target.value);
  };

  return (
    <div className="w-[100%] h-full  flex flex-col gap-4 border-2 border-[#49545a] bg-white rounded shadow">
      <div
        style={{ color: "#2F5848FF" }}
        className="text-[17px] w-full p-2  border-b-2 border-[#49545a] text-left lg:p-4 bg-gray-200  font-semibold"
      >
        Identification du produit
      </div>
      <div className="px-[30px] minWidth-[200px] pb-[30px] lg:px-[80px] lg:pt-[20px] lg:mb-[50px] flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
          <span className="text-[15px] w-full text-left lg:w-[23%] text-gray-700 font-semibold lg:text-right">
            Nom du produit :
          </span>
          <TextField
            fullWidth
            label="Nom du produit"
            value={data.name}
            onChange={handleChange("name")}
            sx={{
              width: 300,
              "& .MuiInputBase-root": {
                height: 40,
                // Centrer verticalement le contenu
                display: "flex",
                alignItems: "center",
              },
              "& .MuiInputBase-input": {
                // Ajuster le padding et la hauteur de ligne
                padding: "6px 12px", // Réduire le padding vertical
                lineHeight: "1.5",
              },
              // Optionnel : ajuster le label si nécessaire
              "& .MuiInputLabel-root": {
                transform: "translate(14px, 8px) scale(1)",
                "&.Mui-focused, &.MuiFormLabel-filled": {
                  transform: "translate(14px, -9px) scale(0.75)",
                },
              },
            }}
          />
        </div>
        <div className="flex flex-col  lg:flex-row gap-2 lg:gap-4">
          <span className="text-[15px]  w-full text-left lg:w-[23%] text-gray-700 font-semibold lg:text-right">
            Type du produit :
          </span>
         <div className="flex flex-col gap-2">
         <TextField
            fullWidth
            disabled
            value={data.productType}
            placeholder="type du produit"
            id="fullWidth"
            sx={{
              width: 300,
              "& .MuiInputBase-root": {
                height: 40,
                // Centrer verticalement le contenu
                display: "flex",
                alignItems: "center",
              },
              "& .MuiInputBase-input": {
                // Ajuster le padding et la hauteur de ligne
                padding: "6px 12px", // Réduire le padding vertical
                lineHeight: "1.5",
              },
              // Optionnel : ajuster le label si nécessaire
              "& .MuiInputLabel-root": {
                transform: "translate(14px, 8px) scale(1)",
                "&.Mui-focused, &.MuiFormLabel-filled": {
                  transform: "translate(14px, -9px) scale(0.75)",
                },
              },
            }}
          />
          <span className="text-[15px] font-semibold opacity-75 italic">{data.fullPath}</span>
         </div>
        </div>
        <div className="flex flex-col  lg:flex-row gap-2 lg:gap-4">
          <span className="text-[15px] w-full  text-left lg:w-[31%] text-gray-700 font-semibold lg:text-right ">
            Prix :
          </span>
          <FormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-amount">Prix</InputLabel>
            <OutlinedInput
              value={data.price}
              onChange={handleChange("price")}
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">XOF</InputAdornment>
              }
              label="Amount"
              sx={{
                width: 300,
                "& .MuiInputBase-root": {
                  height: 40,
                  // Centrer verticalement le contenu
                  display: "flex",
                  alignItems: "center",
                },
                "& .MuiInputBase-input": {
                  // Ajuster le padding et la hauteur de ligne
                  padding: "6px 12px", // Réduire le padding vertical
                  lineHeight: "1.5",
                },
                // Optionnel : ajuster le label si nécessaire
                "& .MuiInputLabel-root": {
                  transform: "translate(14px, 8px) scale(1)",
                  "&.Mui-focused, &.MuiFormLabel-filled": {
                    transform: "translate(14px, -9px) scale(0.75)",
                  },
                },
              }}
            />
          </FormControl>
        </div>
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
          <span className="text-[15px] w-full text-left lg:w-[23%] text-gray-700 font-semibold lg:text-right">
            Marque :
          </span>
          <TextField
            value={data.brand}
            onChange={handleChange("brand")}
            fullWidth
            label="Marque du produit"
            id="fullWidth"
            sx={{
              width: 300,
              "& .MuiInputBase-root": {
                height: 40,
                // Centrer verticalement le contenu
                display: "flex",
                alignItems: "center",
              },
              "& .MuiInputBase-input": {
                // Ajuster le padding et la hauteur de ligne
                padding: "6px 12px", // Réduire le padding vertical
                lineHeight: "1.5",
              },
              // Optionnel : ajuster le label si nécessaire
              "& .MuiInputLabel-root": {
                transform: "translate(14px, 8px) scale(1)",
                "&.Mui-focused, &.MuiFormLabel-filled": {
                  transform: "translate(14px, -9px) scale(0.75)",
                },
              },
            }}
          />
        </div>
        <div className="flex flex-col lg:flex-row  lg:gap-4">
          <span className="text-[15px] w-[18%] text-gray-700 font-semibold text-right"></span>
          <div className="w-[100%] lg:w-[80%] flex flex-col lg:flex-row items-start justify-start lg:items-center  space-x-3  border-2">
            <Checkbox
              checked={data.hasVariants}
              onChange={(e) => updateData("hasVariants", e.target.checked)}
              size="small"
            />
            <span className="text-xs md:text-md font-semibold text-gray-600">
              Votre produit dispose t-il des variantes?
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentificationForm;
