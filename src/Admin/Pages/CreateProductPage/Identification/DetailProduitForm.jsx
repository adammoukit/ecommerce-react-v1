import { getProductMetadata } from "@/State/Admin/AttributesMetadata/Action";
import {
  Checkbox,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Table } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const DetailProduitForm = ({ attributesMetadata, data, updateData }) => {
  const { metadataList, loading, error } = useSelector(
    (store) => store.productMetaData
  );
  const dispatch = useDispatch();

  const handleAttributeChange = (attributeName, value) => {
    updateData("attributes", {
      ...data.attributes,
      [attributeName]: value,
    });
  };

  useEffect(() => {
    dispatch(getProductMetadata("e43bdfdc-972c-41ff-b704-6c6165c86c8e"));
  }, []);

  const renderInput = (attribute) => {
    switch (attribute.dataType.toLowerCase()) {
      case "string":
        return (
          <TextField
            fullWidth
            label={attribute.name}
            value={data.attributes[attribute.name] || ""}
            onChange={(e) =>
              handleAttributeChange(attribute.name, e.target.value)
            }
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
        );
      case "decimal":
        return (
          <TextField
            fullWidth
            label={attribute.name}
            value={data.attributes[attribute.name] || ""}
            onChange={(e) =>
              handleAttributeChange(attribute.name, e.target.value)
            }
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
        );
      case "integer":
        return (
          <TextField
            fullWidth
            label={attribute.name}
            value={data.attributes[attribute.name] || ""}
            onChange={(e) =>
              handleAttributeChange(attribute.name, e.target.value)
            }
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
        );
      case "number":
        return (
          <TextField
            fullWidth
            type="number"
            label={attribute.name}
            value={data.attributes[attribute.name] || 0}
            onChange={(e) =>
              handleAttributeChange(attribute.name, parseFloat(e.target.value))
            }
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
        );
      case "boolean":
        return (
          <Checkbox
            checked={!!data.attributes[attribute.name]}
            onChange={(e) =>
              handleAttributeChange(attribute.name, e.target.checked)
            }
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
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-[100%] h-full  flex flex-col gap-4 border-2 border-[#49545a] bg-white rounded shadow">
      <div
        style={{ color: "#2F5848FF" }}
        className="text-[17px] w-full p-2  border-b-2 border-[#49545a] text-left lg:p-4 bg-gray-200  font-semibold"
      >
        Détails du produit
      </div>
      <div className="px-[30px] minWidth-[200px]  pb-[30px] lg:px-[80px] lg:pt-[20px] lg:mb-[50px] flex flex-col gap-4 ">
        {metadataList.map((attribute) => (
          <div
            key={attribute.id}
            className="grid grid-cols-1 lg:grid-cols-[23%,1fr] items-center gap-4 "
          >
            {/* Libellé avec astérisque */}
            <div className="flex items-center border justify-end gap-1">
              {attribute.required && (
                <span className="text-red-500 text-[22px] font-bold h-[22px] flex items-center">
                  *
                </span>
              )}
              <span className="text-gray-700 font-semibold text-[15px] whitespace-nowrap">
                {attribute.name}:
              </span>
            </div>

            {/* Champ de saisie */}
            <div className="min-h-[60px] lg:px-2 border flex items-center">
              {renderInput(attribute)}
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default DetailProduitForm;
