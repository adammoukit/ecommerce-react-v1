import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  getLevelOneCategories,
  getSubcategories,
} from "../../../State/Category/Action";
import { Button } from "@mui/material";

const CategorySelector2 = ({ handleCategorySelection }) => {
  const dispatch = useDispatch();
  const [currentCategory, setCurrentCategory] = useState(null); // Catégorie actuellement affichée
  const [breadcrumbs, setBreadcrumbs] = useState([]); // Gestion des breadcrumbs

  // Récupérer les catégories et leurs sous-catégories depuis Redux
  const { categories, loading, error, subcategories } = useSelector(
    (state) => state.levelOneCategoriesReducer
  );

  useEffect(() => {
    // Charger les catégories de niveau 1 au chargement du composant
    dispatch(getLevelOneCategories());
  }, [dispatch]);

  const handleCategoryClick = (category) => {
    // Si la catégorie n'a pas de sous-catégories, on la sélectionne
    if (!category.subcategories || category.subcategories.length === 0) {
      handleCategorySelection(category.id);
      return;
    }

    // Charger les sous-catégories si elles ne sont pas déjà récupérées
    if (!subcategories[category.id]) {
      dispatch(getSubcategories(category.id));
    }

    // Mettre à jour la catégorie actuelle et les breadcrumbs
    setCurrentCategory(category);
    setBreadcrumbs((prevBreadcrumbs) => [...prevBreadcrumbs, category]);
  };

  const handleBreadcrumbClick = (category, index) => {
    // Retourner à une catégorie sélectionnée via les breadcrumbs
    setCurrentCategory(category);
    setBreadcrumbs(breadcrumbs.slice(0, index + 1));
  };

  const renderCategories = () => {
    // Afficher les sous-catégories de la catégorie actuelle ou les catégories principales
    const currentCategories = currentCategory
      ? subcategories[currentCategory.id]
      : categories.filter((category) => !category.parentId);

    if (!currentCategories || currentCategories.length === 0) {
      return <p>Aucune catégorie disponible.</p>;
    }

    return (
      <ul className="space-y-2 text-sm">
        {currentCategories.map((category) => (
          <li
            key={category.id}
            className="flex items-center justify-between p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
            onClick={() => handleCategoryClick(category)}
          >
            <span className="text-base opacity-80" style={{ fontSize: "13px" }}>
              {category.name}
            </span>
            {category.subcategories ? (
              <ArrowRightIcon className="text-gray-500 ml-2" />
            ) : (
              <Button
                sx={{ backgroundColor: "#676B81FF", color: "white" }}
                style={{ fontSize: "10px" }}
                onClick={() => handleCategorySelection(category.id)}
              >
                Sélectionner
              </Button>
            )}
          </li>
        ))}
      </ul>
    );
  };

  if (loading) {
    return <p>Chargement des catégories...</p>;
  }

  if (error) {
    return <p className="text-red-500">Erreur : {error}</p>;
  }

  return (
    <div className="p-5 border mt-2 text-sm">
      <h2 className="text-lg font-bold mb-2">Catégorie du produit</h2>

      {/* Système de breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <div className="flex items-center space-x-2 mb-4 text-sm text-gray-600">
          {breadcrumbs.map((breadcrumb, index) => (
            <span key={breadcrumb.id} className="flex items-center">
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  color: "black",
                  opacity: "0.7",
                }}
                className="cursor-pointer hover:text-blue-500"
                onClick={() => handleBreadcrumbClick(breadcrumb, index)}
              >
                {breadcrumb.name}
              </span>
              {index < breadcrumbs.length - 1 && (
                <span className="mx-1">/</span>
              )}
            </span>
          ))}
        </div>
      )}

      {/* Retour à la catégorie précédente */}
      {currentCategory && (
        <button
          className="flex items-center mb-4 text-sm text-blue-500"
          onClick={() => {
            const newBreadcrumbs = breadcrumbs.slice(0, -1);
            setBreadcrumbs(newBreadcrumbs);
            setCurrentCategory(
              newBreadcrumbs.length > 0
                ? newBreadcrumbs[newBreadcrumbs.length - 1]
                : null
            );
          }}
        >
          <ArrowBackIcon className="mr-2" />
          Retour
        </button>
      )}

      {/* Liste des catégories */}
      {renderCategories()}
    </div>
  );
};

export default CategorySelector2;
