import React from "react";

const ProductColors = ({ product, selectedColor, onColorChange }) => {
  // Grouper les variantes par couleur unique
  const colorGroups = product?.variants?.reduce((acc, variant) => {
    const existingColor = acc.find((c) => c.color === variant.color);
    if (!existingColor) {
      acc.push({
        color: variant.color,
        media: variant.media, // Prend la première image de la première variante de cette couleur
        sizes: [variant.size], // Initialise la liste des tailles
      });
    } else {
      // Ajoute la taille si elle n'existe pas déjà
      if (!existingColor.sizes.includes(variant.size)) {
        existingColor.sizes.push(variant.size);
      }
    }
    return acc;
  }, []);

  console.log("Product Colors", colorGroups);

  return (
    <div className="flex flex-col gap-3 rounded-md p-2">
      <div className="flex flex-row gap-2 justify-center">
        {colorGroups?.map((colorGroup, index) => (
          <div
            key={index}
            className={`flex items-center justify-center w-10 h-10 border rounded-lg cursor-pointer hover:shadow-lg overflow-hidden ${
              selectedColor === colorGroup.color
                ? "border-lime-500 shadow-md"
                : "border-gray-200"
            }`}
            title={colorGroup.color}
            onClick={() => onColorChange(colorGroup.color)}
          >
            <img
              src={colorGroup.media?.[0]?.url}
              alt={colorGroup.media?.[0]?.fileName}
              className="w-full h-full object-cover object-top"
            />
          </div>
        ))}
      </div>

      {selectedColor ? (
        <div className="font-bold flex items-center gap-4">
          <h4 className="text-sm">Couleur </h4>
          <span className="opacity-70 text-sm "> :{selectedColor}</span>
        </div>
      ) : (
        "Sélectionnez une couleur"
      )}
    </div>
  );
};

export default ProductColors;
