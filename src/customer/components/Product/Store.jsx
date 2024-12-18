import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGlobalProducts } from "../../../State/Product/Action";
import ProductCard from "./ProductCard";
import { Grid, Pagination } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

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

  if (loading) return <p>Loading...</p>;
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

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {/* Section des filtres/paramètres (4 colonnes) */}
      <Grid item xs={12} md={2}>
        <div
          style={{
            padding: "1rem",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
          }}
        >
          <h2 style={{ marginBottom: "1rem" }}>Filtres</h2>
          {/* Ajouter ici les filtres ou autres fonctionnalités */}
          <p>Ajoutez vos filtres ou options ici.</p>
        </div>
      </Grid>

      {/* Section des produits (8 colonnes) */}
      <Grid item xs={12} md={10}>
        <div className="flex flex-wrap w-full justify-center sm:justify-start gap-3 bg-white py-2">
          {globalProducts.content?.map((item) => (
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
