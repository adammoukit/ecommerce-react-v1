import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilteredProducts,
  filterProducts,
  getAllGlobalProducts,
} from "../../../State/Product/Action";
import ProductCard from "./ProductCard";
import { Grid, Pagination, Skeleton } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import FilterSectionComponent from "./FilterSectionComponent/FilterSectionComponent";
import ProductCardSkeleton from "./ProductCardSkeleton";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const Store = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Récupère la page actuelle depuis l'URL
  const searchParams = new URLSearchParams(location.search);
  const currentPageFromUrl = parseInt(searchParams.get("page")) || 1;

  // État pour suivre la page courante
  const [currentPage, setCurrentPage] = useState(currentPageFromUrl);
  // État pour les filtres actifs
  const [activeFilters, setActiveFilters] = useState([]);

  const [filters, setFilters] = useState({}); // Initialiser filters à un objet vide

  const { globalProducts, loading, error, filteredProducts } = useSelector(
    (state) => state.products
  );

  // useEffect(() => {
  //   // Appliquer les filtres chaque fois qu'ils changent
  //   dispatch(filterProducts(filters));
  // }, [filters, dispatch]);

  if (error) return <p>Error: {error}</p>;

  useEffect(() => {
    console.log("Filters state changed:", filters);
  }, [filters]);

  const handleFilter = (filterType, value) => {
    if (filters && filters[filterType] === value) {
      return;
    }

    setFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [filterType]: value,
      };
      console.log("Updated Filters:", updatedFilters); // Log ici
      return updatedFilters;
    });

    if (!activeFilters.some((filter) => filter.value === value)) {
      setActiveFilters((prevFilters) => [
        ...prevFilters,
        { type: filterType, value },
      ]);
    }

    console.log("Active Filters:", activeFilters); // Log actif
  };

  const resetFilters = () => {
    setFilters({}); // Réinitialiser filters à un objet vide
    setActiveFilters([]);
    dispatch(clearFilteredProducts());
  };
  // Dans le composant parent (Store.js)
  const removeFilter = (filterType, value) => {
    setActiveFilters((prevFilters) =>
      prevFilters.filter(
        (filter) => filter.type !== filterType || filter.value !== value
      )
    );

    setFilters((prevFilters) => {
      const { [filterType]: removed, ...restFilters } = prevFilters;
      return restFilters;
    });
  };

  useEffect(() => {
    const updatedPage =
      parseInt(new URLSearchParams(location.search).get("page")) || 1;
    setCurrentPage(updatedPage);
  }, [location.search]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const hasFilters =
      Object.keys(filters).length > 0 &&
      Object.values(filters).some(
        (value) => value !== null && value !== undefined && value !== ""
      );

    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", currentPage);

    if (hasFilters) {
      // Recharge les produits filtrés
      Object.keys(filters).forEach((key) => {
        if (
          filters[key] !== null &&
          filters[key] !== undefined &&
          filters[key] !== ""
        ) {
          searchParams.append(key, filters[key]);
        }
      });
      navigate({ search: searchParams.toString() });
      dispatch(filterProducts({ ...filters, page: currentPage - 1 }));
    } else {
      dispatch(clearFilteredProducts());
      // Recharge les produits globaux
      navigate({ search: `?page=${currentPage}` });
      dispatch(getAllGlobalProducts(currentPage - 1));
    }
  }, [currentPage, filters, dispatch, navigate]);

  const hasActiveFilters = Object.keys(filters).length > 0;
  const hasFilteredProducts =
    hasActiveFilters && filteredProducts?.content?.length > 0;
  const hasGlobalProducts = globalProducts?.content?.length > 0;

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {/* Section des filtres/paramètres (4 colonnes) */}
      <Grid item xs={12} md={2}>
        <FilterSectionComponent
          handleFilter={handleFilter}
          removeFilter={removeFilter}
          activeFilters={activeFilters}
        />
        <button onClick={resetFilters} className="reset-filters-button">
          Réinitialiser les filtres
        </button>
      </Grid>

      {/* Section des produits (8 colonnes) */}
      <Grid item xs={12} md={10}>
        <Stack direction="row" spacing={1} sx={{ paddingY: "5px" }}>
          {activeFilters.map((filter, index) => (
            <Chip
              key={filter.value}
              label={`${filter.value}`}
              onDelete={() => removeFilter(filter.type, filter.value)}
              color="primary"
              variant="outlined"
            />
          ))}
        </Stack>
        <div className="flex flex-wrap w-full justify-center sm:justify-start gap-3 bg-white py-2">
          {loading ? (
            // Affichage du skeleton si les données sont en cours de chargement
            Array.from({ length: 5 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          ) : Object.keys(filters).length > 0 ? (
            // Si des filtres sont actifs
            filteredProducts?.content?.length > 0 ? (
              // Affichage des produits filtrés s'ils existent
              filteredProducts.content.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))
            ) : (
              // Message lorsqu'aucun produit ne correspond aux filtres
              <p className="text-center w-[100%] text-4xl mt-[10%] font-bold  text-red-400">
                Aucun produit disponible pour le fitre !!!
              </p>
            )
          ) : globalProducts?.content?.length > 0 ? (
            // Affichage des produits globaux si aucun filtre n'est actif
            globalProducts.content.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))
          ) : (
            // Message lorsqu'il n'y a aucun produit global
            <p className="text-center text-gray-500">
              Aucun produit disponible.
            </p>
          )}
        </div>
        {/* Pagination pour les produits */}
        <section className="w-full px-4 py-3">
          <div className="flex justify-center">
            <Pagination
              count={
                filteredProducts && filteredProducts.totalPages
                  ? filteredProducts.totalPages
                  : globalProducts?.totalPages
              }
              color="secondary"
              page={currentPage}
              onChange={handlePageChange}
            />
          </div>
        </section>
      </Grid>
    </Grid>
  );
};

export default Store;
