import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";

const VariantesInput = ({ variants, setVariants, variantType, productData }) => {
  const [currentCouleur, setCurrentCouleur] = useState("");
  const [currentTaille, setCurrentTaille] = useState("");

  // Réinitialiser les champs quand le type change
  useEffect(() => {
    setCurrentCouleur("");
    setCurrentTaille("");
  }, [variantType]);

  const generateSKU = () => {
    return `SKU-${Math.random().toString(36).substr(2, 15).toUpperCase()}`;
  };

  const handleAddVariant = () => {
    let newVariant;

    if (variantType === "couleur-taille") {
      if (!currentCouleur.trim() || !currentTaille.trim()) return;
      newVariant = {
        id: Date.now(),
        couleur: currentCouleur.trim(),
        taille: currentTaille.trim(),
        sku: generateSKU(),
        condition: "Neuf",
        prix: "",
        selected: false,
      };
    } else if (variantType === "couleur") {
      if (!currentCouleur.trim()) return;
      newVariant = {
        id: Date.now(),
        couleur: currentCouleur.trim(),
      
        sku: generateSKU(),
        condition: "Neuf",
        prix: "",
        selected: false,
      };
    } else if (variantType === "taille") {
      if (!currentTaille.trim()) return;
      newVariant = {
        id: Date.now(),
       
        taille: currentTaille.trim(),
        sku: generateSKU(),
        condition: "Neuf",
        prix: "",
        selected: false,
      };
    }

    setVariants([...variants, newVariant]);
    setCurrentCouleur("");
    setCurrentTaille("");

    
    
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAddVariant();
   
  };

  return (
    <div className="w-full flex flex-col items-start gap-2 lg:flex-row lg:gap-10 p-2 lg:p-4 bg-white border rounded">
      {/* Partie gauche - Ajout */}
      <div className="flex flex-col gap-2 items-start lg:flex-row w-full max-w-sm lg:items-end space-x-2">
        <div className="flex flex-col gap-2 w-full">
          {/* Input Couleur */}
          {variantType?.includes("couleur") && (
            <div className="flex flex-col gap-2 w-full lg:flex-row lg:gap-3">
              <span className="text-[15px] w-[35%] text-gray-700 font-bold">
                Couleur :
              </span>
              <Input
                type="text"
                placeholder="Ajouter une couleur"
                value={currentCouleur}
                onChange={(e) => setCurrentCouleur(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
          )}

          {/* Input Taille */}
          {variantType?.includes("taille") && (
            <div className="flex flex-col gap-2 w-full lg:flex-row lg:gap-3 mt-2 lg:mt-0">
              <span className="text-[15px] w-[35%] text-gray-700 font-bold">
                Taille :
              </span>
              <Input
                type="text"
                placeholder="Ajouter une taille"
                value={currentTaille}
                onChange={(e) => setCurrentTaille(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
          )}
        </div>

        {variantType && (
          <Button
            variant="contained"
            onClick={handleAddVariant}
            disabled={
              (variantType?.includes("couleur") && !currentCouleur.trim()) ||
              (variantType?.includes("taille") && !currentTaille.trim())
            }
          >
            Ajouter
          </Button>
        )}
      </div>

      <Divider orientation="vertical" flexItem />

      {/* Partie droite - Affichage */}
      <div className="flex flex-wrap gap-2 ml-4">
        {variants.map((variant, index) => (
          <div
            className="border rounded p-2 flex items-center gap-2 bg-gray-50"
            key={variant.id}
          >
            <span className="text-sm font-semibold">
              {variant.couleur && variant.taille
                ? `${variant.couleur}/${variant.taille}`
                : variant.couleur || variant.taille}
            </span>
            <button
              className="text-red-500 hover:text-red-700 ml-2"
              onClick={() =>
                setVariants(variants.filter((_, i) => i !== index))
              }
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VariantesInput;
