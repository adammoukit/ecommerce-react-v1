import React from "react";

const ProductImages = ({ productData, updateProductData }) => {
  // Gestion de l'image principale
  const handleMainImageChange = (files) => {
    // Prendre seulement la première image pour l'image principale
    if (files.length > 0) {
      updateProductData("mainImage", "", [files[0]]);
    }
  };

  const handleImageChange = (variantKey, newFiles) => {
    // Récupérer les images existantes pour cette variante
    const existingImages = productData.images[variantKey] || [];

    // Ajouter les nouvelles images aux images existantes
    const updatedImages = [...existingImages, ...newFiles];

    // Mettre à jour les données du produit
    updateProductData("images", variantKey, updatedImages);
  };

  // Fonction pour obtenir le nom d'affichage d'une variante
  const getVariantName = (option) => {
    // Pour les variantes de type "couleur"
    if (option.couleur && !option.taille) {
      return option.couleur;
    }
    // Pour les variantes de type "taille"
    else if (option.taille && !option.couleur) {
      return option.taille;
    }
    // Pour les combinaisons couleur-taille
    else if (option.couleur && option.taille) {
      return `${option.couleur} - ${option.taille}`;
    }
    // Fallback pour les cas inattendus
    return "Variante";
  };

  return (
    <div className="w-[100%] h-full flex flex-col gap-4 border-2 border-[#49545a] bg-white rounded shadow">
      <div
        style={{ color: "#2F5848FF" }}
        className="text-[17px] w-full p-2  border-b-2 border-[#49545a] text-left lg:p-4 bg-gray-200 font-semibold"
      >
        Images des variantes
      </div>

      <div className="px-[30px] minWidth-[200px] pb-[30px] lg:px-[80px] lg:pt-[20px] lg:mb-[50px] flex flex-col gap-6">
        <div className="variant-section border-2 p-2 rounded mb-5 flex flex-col items-center">
          <h3 className="text-[27px] font-semibold mb-3">
            Image principale du produit
          </h3>

          <input
            type="file"
            multiple
            onChange={(e) => {
              if (e.target.files.length > 0) {
                handleMainImageChange(Array.from(e.target.files));
                e.target.value = null;
              }
            }}
            className="mb-2"
          />

          <div className="preview-container flex flex-wrap gap-2 justify-center">
            {(productData.mainImage || []).map((file, index) => (
              <div key={`main-preview-${index}`} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Main preview ${index}`}
                  className="w-48 h-48 object-cover border-2 border-blue-500 rounded-lg"
                />
                <button
                  className="absolute top-1 right-1 font-bold text-2xl text-red-500 bg-white rounded-full w-8 h-8 flex items-center justify-center"
                  onClick={() => {
                    if (window.confirm("Supprimer l'image principale ?")) {
                      updateProductData("mainImage", "", []);
                    }
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        {productData.variations.options.map((option, index) => {
          //   const variantKey =
          //     typeof option === "string"
          //       ? option
          //       : `${option.couleur}-${option.taille}`;

          const displayName = getVariantName(option);

          return (
            <div
              key={`variant-${index}`}
              className="variant-section border-2 p-2 rounded"
            >
              <h3 className="text-md font-semibold mb-3">
                Images pour <span className="py-1 border-2 border-orange-400 px-3 bg-slate-300 rounded">{displayName}</span>
              </h3>

              <input
                type="file"
                multiple
                onChange={(e) => {
                  if (e.target.files.length > 0) {
                    handleImageChange(displayName, Array.from(e.target.files));
                    e.target.value = null; // Réinitialise l'input
                  }
                }}
                className="mb-2"
              />

              <div className="preview-container flex flex-wrap gap-2">
                {(productData.images[displayName] || []).map(
                  (file, fileIndex) => (
                    <div
                      key={`preview-${index}-${fileIndex}`}
                      className="relative p-2"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${fileIndex}`}
                        className="w-24 h-24 object-cover border rounded"
                      />
                      <button
                        className="absolute top-1 right-1 font-bold text-2xl text-red-500 bg-white rounded-full w-8 h-8 flex items-center justify-center"
                        onClick={() => {
                          if (window.confirm("Supprimer cette image ?")) {
                            // 1. Créer une copie de toutes les images
                            const updatedImages = { ...productData.images };

                            // 2. Créer une copie du tableau pour cette variante spécifique
                            const variantImages = [
                              ...(updatedImages[displayName] || []),
                            ];

                            // 3. Supprimer l'image à l'index spécifié
                            variantImages.splice(fileIndex, 1);

                            // 4. Mettre à jour le tableau pour cette variante
                            updatedImages[displayName] = variantImages;

                            // 5. Mettre à jour l'état global
                            // Mettre à jour l'état global via updateProductData
                            updateProductData("images", updatedImages);
                          }
                        }}
                      >
                        x
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductImages;
