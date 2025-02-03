import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  getLevelOneCategories,
  getSubcategories,
} from "../../../State/Category/Action";

const CategorySelector = ({ handleCategorySelection }) => {
  const dispatch = useDispatch();
  const [expandedCategories, setExpandedCategories] = useState({});

  // Récupérer les catégories et l'état de chargement depuis Redux
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
    }

    // Charger les sous-catégories si elles ne sont pas déjà récupérées
    if (!subcategories[category.id]) {
      dispatch(getSubcategories(category.id));
    }

    // Basculer l'état d'expansion de la catégorie
    setExpandedCategories((prevState) => ({
      ...prevState,
      [category.id]: !prevState[category.id],
    }));
  };

  const renderSubcategories = (category) => {
    const categorySubcategories = subcategories[category.id];

    // Si aucune sous-catégorie n'existe
    if (!categorySubcategories || categorySubcategories.length === 0) {
      return null;
    }

    return (
      <ul className="ml-5 space-y-1 mt-2 text-sm">
        {categorySubcategories.map((subcategory) => (
          <li key={subcategory.id} className="cursor-pointe">
            <div
              className="flex items-center justify-between w-full"
              onClick={() => handleCategoryClick(subcategory)}
            >
              <span
                className={`hover:text-orange-300 rounded ${
                  subcategory.subcategories &&
                  subcategory.subcategories.length > 0
                    ? "opacity-100"
                    : "opacity-70"
                }`}
              >
                {subcategory.name}
              </span>
              {/* Flèche si la sous-catégorie a des enfants */}
              {subcategory.subcategories &&
                subcategory.subcategories.length > 0 &&
                (expandedCategories[subcategory.id] ? (
                  <ArrowDropDownIcon className="text-gray-500 ml-2" />
                ) : (
                  <ArrowRightIcon className="text-gray-500 ml-2" />
                ))}
            </div>
            {/* Récursion pour les sous-catégories */}
            {expandedCategories[subcategory.id] &&
              renderSubcategories(subcategory)}
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
    <div className="p-5 border mt-2">
      <h2 className="text-sm md:text-lg opacity-70 font-bold mb-2">
        Catégorie du produit
      </h2>
      {/* Liste des catégories de niveau 1 */}
      <ul className="space-y-2 w-full">
        {categories
          .filter((category) => !category.parentId) // Affiche uniquement les catégories sans parent
          .map((category) => (
            <li
              key={category.id}
              className="flex flex-col items-start justify-between border-2 rounded cursor-pointer  bg-gray-200 "
            >
              <div
                className="flex items-center justify-between  w-full"
                onClick={() => handleCategoryClick(category)}
              >
                <span className="text-base p-2 opacity-80">
                  {category.name}
                </span>
                {/* Flèche si la catégorie a des enfants */}
                {category.subcategories &&
                  category.subcategories.length > 0 &&
                  (expandedCategories[category.id] ? (
                    <ArrowDropDownIcon className="text-gray-500 ml-2" />
                  ) : (
                    <ArrowRightIcon className="text-gray-500 ml-2" />
                  ))}
              </div>
              {/* Afficher les sous-catégories si la catégorie est étendue */}
              {expandedCategories[category.id] && renderSubcategories(category)}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CategorySelector;
