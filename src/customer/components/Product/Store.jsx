import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGlobalProducts } from "../../../State/Product/Action";
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

  const { globalProducts, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    // Met à jour la page dans l'état local si elle change dans l'URL
    setCurrentPage(currentPageFromUrl);
    // Charge les produits pour la page actuelle
    dispatch(getAllGlobalProducts(currentPageFromUrl - 1)); // Page backend commence à 0
  }, [dispatch, currentPageFromUrl]);

  if (error) return <p>Error: {error}</p>;

  //   const handlePaginationChange = (event, value) => {
  //     const searchParams = new URLSearchParams(location.search);
  //     searchParams.set("page", value);
  //     const query = searchParams.toString();
  //     navigate({ search: `?${query}` });
  //   };

  const handlePaginationChange = (event, value) => {
    // Met à jour l'URL avec la nouvelle page
    navigate(`?page=${value}`);
  };

  // État pour les filtres actifs
  const [activeFilters, setActiveFilters] = useState([]);

  // Fonction pour ajouter un filtre
  const addFilter = (filter) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  // Fonction pour supprimer un filtre
  const removeFilter = (filter) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
  };

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {/* Section des filtres/paramètres (4 colonnes) */}
      <Grid item xs={12} md={2}>
        <FilterSectionComponent addFilter={addFilter} />
      </Grid>

      {/* Section des produits (8 colonnes) */}
      <Grid item xs={12} md={10}>
        <Stack direction="row" spacing={1} sx={{ paddingY: "5px" }}>
          {activeFilters.map((filter, index) => (
            <Chip
              key={index}
              label={filter}
              onDelete={() => removeFilter(filter)}
            />
          ))}
        </Stack>
        <div className="flex flex-wrap w-full justify-center sm:justify-start gap-3 bg-white py-2">
          {loading
            ? Array.from({ length: 10 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : globalProducts.content?.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
        </div>
        {/* Pagination pour les produits */}
        <section className="w-full px-4 py-3">
          <div className="flex justify-center">
            <Pagination
              count={globalProducts?.totalPages}
              color="secondary"
              page={currentPage}
              onChange={handlePaginationChange}
            />
          </div>
        </section>
      </Grid>
    </Grid>
  );
};

export default Store;
