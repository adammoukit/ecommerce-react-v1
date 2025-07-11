import { Checkbox } from "@mui/material";
import React, { useState } from "react";
import VariantesInput from "./VarianteOperations/VariantesInput";
import SchemaIcon from "@mui/icons-material/Schema";
import { AppWindow } from "lucide-react";
import VariantTemplate from "./VarianteOperations/VariantTemplate";

const Variante = ({ data, updateData, productData }) => {
  const handleCheckboxChange = (option) => {
    const newType = data.type === option ? null : option;

    if (data.options?.length > 0 && newType !== null) {
      // Version avec message personnalisé
      const confirmChange = window.confirm(
        `Changer le type de variation supprimera les ${data.options.length} options existantes. Continuer ?`
      );

      if (confirmChange) {
        // Si OK est cliqué
        updateData("type", newType);
        updateData("options", []);
      }
      // Si Annuler est cliqué, on ne fait rien
    } else {
      // Cas sans options existantes
      updateData("type", newType);
    }
  };
  return (
    <div className="w-full   h-full flex flex-col gap-4 bg-white rounded  border-2 border-[#49545a]  shadow">
      <div className="flex flex-col gap-2">
        <div
          style={{ color: "#2F5848FF" }}
          className="text-[17px] w-full flex items-center gap-3 border-b-2 border-[#49545a] text-left p-2 lg:p-4 bg-gray-200  font-semibold"
        >
          <span>Les variations</span>
          <SchemaIcon />
        </div>
        <div className="flex gap-2 lg:gap:4  lg:p-4">
          <div>
            <Checkbox
              checked={data.type === "couleur"}
              onChange={() => handleCheckboxChange("couleur")}
              size="small"
            />
            <span className="text-md font-semibold text-gray-600">Couleur</span>
          </div>
          <div>
            <Checkbox
              checked={data.type === "taille"}
              onChange={() => handleCheckboxChange("taille")}
              size="small"
            />
            <span className="text-md font-semibold text-gray-600">Taille</span>
          </div>
          <div>
            <Checkbox
              checked={data.type === "couleur-taille"}
              onChange={() => handleCheckboxChange("couleur-taille")}
              size="small"
            />

            <span className="text-md font-semibold text-gray-600">
              Couleur-Taille
            </span>
          </div>
        </div>
        <div className="w-full p-2 flex flex-col gap-2 lg:p-4">
          <VariantesInput
            variants={data.options}
            setVariants={(options) => updateData("options", options)}
            variantType={data.type}
            productData={productData}
          />
          {data.type && data.options.length > 0 && (
            <VariantTemplate
              variantType={data.type}
              variants={data.options}
              onVariantChange={(updatedVariants) =>
                updateData("options", updatedVariants)
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Variante;
