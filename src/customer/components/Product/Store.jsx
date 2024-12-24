import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
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

  const [filters, setFilters] = useState(null); // Initialiser filters à null

  const { globalProducts, loading, error, filteredProducts } = useSelector(
    (state) => state.products
  );

  console.log("globalProducts:", globalProducts.content);

  // useEffect(() => {
  //   // Appliquer les filtres chaque fois qu'ils changent
  //   dispatch(filterProducts(filters));
  // }, [filters, dispatch]);

  if (error) return <p>Error: {error}</p>;

  const handleFilter = (filterType, value) => {
    // Si la valeur est déjà présente dans le filtre actif, ne rien faire
    if (filters && filters[filterType] === value) {
      return;
    }

    // Mettre à jour les filtres actifs
    setFilters((prevFilters) => {
      // Ajouter le nouveau filtre sans supprimer les anciens
      return {
        ...prevFilters,
        [filterType]: value,
      };
    });

    // Ajouter un filtre actif visuellement
    if (!activeFilters.some((filter) => filter.value === value)) {
      setActiveFilters((prevFilters) => [
        ...prevFilters,
        { type: filterType, value },
      ]);
    }

    console.log("produitsFiltres :", filters);
  };

  const resetFilters = () => {
    setFilters(null); // Réinitialiser filters à null
    setActiveFilters([]);
  };

  const removeFilter = (filterType, value) => {
    // Retirer un filtre actif visuellement
    setActiveFilters((prevFilters) =>
      prevFilters.filter(
        (filter) => filter.type !== filterType || filter.value !== value
      )
    );

    // Mettre à jour les filtres dans l'état global en remplaçant la valeur du filtre par null
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: null,
    }));
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page); // Met à jour la page actuelle dans l'état
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", page); // Ajoute ou met à jour le paramètre `page` dans l'URL
    navigate({ search: `?${searchParams.toString()}` }); // Navigue vers l'URL mise à jour
  };

  useEffect(() => {
    const updatedPage =
      parseInt(new URLSearchParams(location.search).get("page")) || 1;
    setCurrentPage(updatedPage);
  }, [location.search]);

  useEffect(() => {
    if (filters !== null) {
      // Vérifier que filters n'est pas null
      dispatch(filterProducts(filters)); // Charger les produits filtrés si des filtres sont définis
    }
    dispatch(getAllGlobalProducts(currentPageFromUrl - 1));
  }, [filters, dispatch, currentPage]);

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {/* Section des filtres/paramètres (4 colonnes) */}
      <Grid item xs={12} md={2}>
        <FilterSectionComponent handleFilter={handleFilter} />
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
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : filteredProducts?.content?.length > 0
            ? filteredProducts.content.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))
            : globalProducts?.content?.length > 0
            ? globalProducts.content.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))
            : "Aucun produit disponible"}
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
