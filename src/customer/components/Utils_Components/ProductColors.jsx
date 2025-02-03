import React from "react";

const ProductColors = ({ product, activeVariant, onVariantChange }) => {
  const variants = product?.variants || [];

  return (
    <div className="flex flex-col gap-3 w-full rounded-md p-2">
      {/* Affichage de l'attribut actif avec opacité */}
      <h2 className="font-bold text-lg">
        {activeVariant ? (
          <>
            Couleur :{" "}
            <span className="opacity-70">{activeVariant.color}</span>
          </>
        ) : (
          "Aucune variante sélectionnée"
        )}
      </h2>

      <div className="flex flex-row gap-2">
        {variants.map((variant, index) => (
          <div
            key={index}
            className={`flex items-center justify-center w-10 h-12 border rounded-lg cursor-pointer hover:shadow-lg ${
              activeVariant === variant ? "border-lime-500 shadow-md" : ""
            }`}
            style={{
              borderColor: activeVariant === variant ? "lime" : "gray",
              overflow: "hidden",
              backgroundColor: "white",
            }}
            title={variant.color}
            onClick={() => onVariantChange(variant)} // Change la variante active
          >
            <img
              src={variant.media?.[0]?.url} // Première image de la variante
              alt={variant.media?.[0]?.fileName}
              className="w-full h-full object-cover object-top"
              style={{ width: "100%", height: "100%" }} // Taille de la vignette
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductColors;
