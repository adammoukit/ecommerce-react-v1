"use client";

import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid2,
  Rating,
  Typography,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import ProductReviewsCard from "./ProductReviewsCard";
import { mens_kurta } from "../../../Data/mens/men_kurta";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../../../State/Product/Action";
import { addItemToCart, getCart } from "../../../State/Cart/Action";
import "./ProductDetails.css";
import {
  getCategoryHierarchy,
  getCategoryIdByProductId,
} from "../../../State/Admin/Category/Action";
import BasicSelect from "../Mui/BasicSelect";
import ProductColors from "../Utils_Components/ProductColors";
import AliceCarousel from "react-alice-carousel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { toast } from "react-toastify";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  // const [selectedSize, setSelectedSize] = useState();
  const [isCategoryIdFetched, setIsCategoryIdFetched] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store);
  // Récupération des données du store
  const { hierarchy, categoryId, loading, error } = useSelector(
    (state) => state.category
  );

  const [activeVariant, setActiveVariant] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [colorMedia, setColorMedia] = useState([]);

  // Quand les données des produits sont disponibles, définissez la première variante par défaut
  useEffect(() => {
    if (products.product && products.product.hasVariants) {
      const firstVariant = products.product.variants[0]; // Première variante
      setActiveVariant(firstVariant);
      setMainImage(
        firstVariant?.media?.[0]?.url || "https://via.placeholder.com/150"
      );
      // setSelectedSize(firstVariant?.sizes?.[0]?.size || null); // Par défaut, la première taille
    } else if (products.product) {
      setMainImage(
        products.product.media?.[0]?.url || "https://via.placeholder.com/150"
      );
    }
  }, [products]);

  const handleVariantChange = (variant) => {
    setActiveVariant(variant); // Met à jour la variante active
    setMainImage(variant.media?.[0]?.url); // Définit la première image de la variante comme l'image principale
  };

  const navigate = useNavigate();

  const [isSmUp, setIsSmUp] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmUp(window.innerWidth >= 640); // 640px = sm en Tailwind
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAddToCart = () => {
    if (!products.product) return;

    // Cas produit sans variante
    if (products.product.variantType === "NONE") {
      const cartData = {
        productId: products.product.id,
        quantity: 1,
        variantId: null, // Doit être explicitement null
      };

      console.log("les donnees du panier ", cartData);

      // Un seul appel dispatch
      dispatch(addItemToCart(cartData))
        .then(() => alert("Ajouté !"))
        .catch((error) => alert(`Erreur: ${error}`));

      return;
    }

    // Validation des variantes
    let errorMessage;
    switch (products.product.variantType) {
      case "COLOR_AND_SIZE":
        if (!selectedColor || !selectedSize)
          errorMessage = "Sélectionnez une couleur et une taille";
        break;
      case "COLOR":
        if (!selectedColor) errorMessage = "Sélectionnez une couleur";
        break;
      case "SIZE":
        if (!selectedSize) errorMessage = "Sélectionnez une taille";
        break;
    }

    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    // Trouver la variante exacte
    const selectedVariant = products.product.variants.find((v) => {
      switch (products.product.variantType) {
        case "COLOR_AND_SIZE":
          return v.color === selectedColor && v.size === selectedSize;
        case "COLOR":
          return v.color === selectedColor;
        case "SIZE":
          return v.size === selectedSize;
        default:
          return false;
      }
    });

    if (!selectedVariant) {
      alert("Combinaison indisponible");
      return;
    }

    const cartData = {
      productId: products.product.id,
      quantity: 1,
      variantId: selectedVariant?.id,
    };

    // dispatch(addItemToCart(cartData));

    dispatch(addItemToCart(cartData))
      .then(() => {
        // alert("Produit ajouté au panier  avec variant!");
        toast.success("Produit ajouté au panier");
        return dispatch(getCart());
      })
      .catch((error) => alert(`Erreur: ${error.message}`));
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = { productId: params.productId };

      dispatch(findProductById(data));

      // D'abord, on récupère l'ID de la catégorie
      dispatch(getCategoryIdByProductId(params.productId));
      setIsCategoryIdFetched(true);
    };

    // Lancer la récupération de l'ID de la catégorie
    fetchData();
    // Scroll vers le haut de la page
    window.scrollTo(0, 0);
  }, [params.productId, dispatch]);

  useEffect(() => {
    if (isCategoryIdFetched && categoryId) {
      // Une fois que l'ID de la catégorie est récupéré, on récupère la hiérarchie
      dispatch(getCategoryHierarchy(categoryId));
    }
  }, [isCategoryIdFetched, categoryId, dispatch]);

  // Conversion de la réponse serveur en tableau
  const categories = hierarchy ? hierarchy.split("›") : [];

  // Générer les chemins cumulés pour les liens
  const generatePath = (index) =>
    categories
      .slice(0, index + 1)
      .join("/")
      .toLowerCase();

  // Mettre à jour l'image principale lors du changement de couleur/taille
  useEffect(() => {
    if (selectedColor && selectedSize) {
      const variant = products.product?.variants?.find(
        (v) => v.color === selectedColor && v.size === selectedSize
      );
      setMainImage(variant?.media?.[0]?.url);
    } else if (selectedColor) {
      const firstVariant = products.product?.variants?.find(
        (v) => v.color === selectedColor
      );
      setMainImage(firstVariant?.media?.[0]?.url);
    } else {
      setMainImage(products.product?.media?.[0]?.url);
    }
  }, [selectedColor]);

  // Initialiser la couleur sélectionnée
  useEffect(() => {
    if (products.product?.hasVariants) {
      const firstVariant = products.product.variants[0];
      setSelectedColor(firstVariant.color);
      setSelectedSize(firstVariant.size);
      setActiveVariant(firstVariant);
      setMainImage(firstVariant?.media?.[0]?.url);
      updateColorMedia(firstVariant.color);
    }
  }, [products.product]);

  // Récupérer les tailles disponibles pour la couleur sélectionnée
  const availableSizes =
    products.product?.variants
      ?.filter((v) => v.color === selectedColor)
      ?.map((v) => ({ size: v.size, stock: v.stock })) || [];

  // Met à jour les médias quand la couleur change
  const updateColorMedia = (color) => {
    const mediaTable = products.product?.variants?.filter(
      (v) => v.color === color
    );

    const media = mediaTable[0]?.media || []; // Prend la première variante de cette couleur

    // products.product?.variants
    //   ?.filter((v) => v.color === color)
    //   ?.flatMap((v) => v.media)
    //   ?.filter((v, i, a) => a.findIndex((t) => t.url === v.url) === i) || []; // Évite les doublons

    setColorMedia(media);
  };

  // Gestion du changement de couleur
  useEffect(() => {
    if (selectedColor) {
      updateColorMedia(selectedColor);
      setSelectedSize(null);
      const firstVariant = products.product.variants.find(
        (v) => v.color === selectedColor
      );
      setMainImage(firstVariant?.media?.[0]?.url);
    }
  }, [selectedColor]);

  // Les fonctions de gestion de carousel des images du produit
  const carouselRef = useRef(null);
  const slideNext = () => carouselRef.current.slideNext();
  const slidePrev = () => carouselRef.current.slidePrev();
  const [activeIndex, setActiveIndex] = useState(0);

  // Génère les éléments du carrousel
  const items = activeVariant?.media?.map((media, index) => (
    <img
      key={index}
      src={media.url}
      alt={`Slide ${index}`}
      className="w-full h-full object-contain object-top"
    />
  ));

  // Met à jour l'image principale et l'index quand on clique sur une vignette
  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    setMainImage(activeVariant.media[index].url);
  };

  // Synchronise l'index quand le carrousel change de slide
  const handleSlideChanged = (e) => {
    setActiveIndex(e.item);
    if (activeVariant?.media?.[e.item]) {
      setMainImage(activeVariant.media[e.item].url);
    }
  };

  useEffect(() => {
    if (activeVariant) {
      setMainImage(activeVariant.media?.[0]?.url);
      setColorMedia(activeVariant.media || []);
    }
  }, [activeVariant]);

  // Galerie d'images
  const ImageGallery = () => (
    <div className="flex flex-col relative items-center py-3 sm:py-5 gap-y-2 shadow-sm rounded bg-white">
      {activeIndex > 0 && (
        <button
          onClick={slidePrev}
          className="absolute top-1/4 left-2 z-50  bg-gray-800 text-white p-2 rounded-full"
        >
          &#9664;
        </button>
      )}
      {activeIndex < items?.length - 1 && (
        <button
          onClick={slideNext}
          className="absolute top-1/4 right-2 z-50  bg-gray-800 text-white p-2 rounded-full"
        >
          &#9654;
        </button>
      )}
      <div className="overflow-hidden rounded-lg w-full max-w-[16rem] h-[14rem] sm:h-[18rem]">
        {loading ? (
          "Chargemment..."
        ) : (
          <>
            <AliceCarousel
              ref={carouselRef}
              // mouseTracking
              items={items}
              disableButtonsControls
              activeIndex={activeIndex}
              onSlideChanged={handleSlideChanged}
              // autoPlay
              autoPlayInterval={3000}
              // infinite
            />

            <div className="rounded-lg">
              <img
                alt={products.product?.name}
                src={mainImage}
                className="w-full h-full object-contain object-top rounded-xl"
              />
            </div>
          </>
        )}
      </div>

      <div className="flex items-center p-1 sm:p-3 flex-wrap gap-1 sm:gap-2 justify-center">
        {" "}
        {/* Padding/gap réduits mobile */}
        {activeVariant?.media?.map((media, index) => (
          <div
            key={index}
            className={`overflow-hidden p-0.5 sm:p-1 rounded-lg w-10 h-10 sm:w-14 sm:h-14 border-2 cursor-pointer
            ${
              activeIndex === index ? "border-lime-500" : "border-gray-200"
            }`} /* Taille réduite mobile */
          >
            {loading ? (
              <CircularProgress size="30px" />
            ) : (
              <img
                alt={`Vignette ${index + 1}`}
                src={media.url}
                className="h-full w-full object-cover object-top"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-slate-100 px-3 sm:px-6 relative productTypographie">
      <div className="pt-3">
        <nav
          aria-label="Breadcrumb"
          className="p-2 sm:p-3 bg-white rounded mx-auto"
        >
          {loading && <p>Chargement...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {!loading && !error && (
            <ul className="breadcrumb">
              {categories.map((category, index) => (
                <li key={index} className="flex items-center">
                  <Link
                    to={`/categories/${generatePath(index)}`}
                    className="font-bold text-xs sm:text-sm text-lime-950 opacity-70 whitespace-nowrap"
                  >
                    {category}
                  </Link>
                  {index < categories.length - 1 && (
                    <span className="mx-1 sm:mx-2 text-lg font-bold">›</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </nav>

        <section className="grid grid-cols-1 lg:grid-cols-8 sm:grid-cols-5 gap-x-8  lg:gap-x-3 gap-y-10  mt-2 ">
          {/* Image gallery */}
          <div className="lg:col-span-3 md:col-span-2">
            {" "}
            {/* Responsive colonnes */}
            <ImageGallery />
          </div>
          {/* Product info */}
          <div className="lg:col-span-4 md:col-span-3 mx-auto px-2 sm:px-4 pb-8 sm:pb-16 bg-white py-2 lg:px-5 rounded shadow">
            <div className=" ">
              <h1 className="text-lg font-bold tracking-tight text-gray-500 sm:text-3xl mb-1">
                <div className="flex flex-col gap-y-3 justify-between items-start py-2 px-2 sm:px-3 rounded border-2 shadow-sm w-full">
                  <h2 className="text-base font-semibold sm:text-[27px]">
                    {products.product?.name}
                  </h2>
                  <p
                    style={{ fontSize: "28px" }} /* Taille réduite sur mobile */
                    className="font-bold opacity-80 text-black sm:text-[35px]" /* Responsive font size */
                  >
                    <span className="">
                      {products.product?.price}{" "}
                      <span className="text-[16px] sm:text-[20px]">F CFA</span>{" "}
                      {/* Taille texte réduite mobile */}
                    </span>
                  </p>
                </div>
              </h1>
            </div>
            <div className="rounded border-2 p-2 mt-4">
              <div className="flex flex-col items-start p-2   gap-y-2 my-2">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-4 w-full">
                  <div className="flex flex-row items-center gap-x-2">
                    <h3 className="font-bold lg:text-[18px] opacity-65">
                      Category :
                    </h3>
                    <p className="lg:text-[16px] font-bold text-black opacity-90">
                      {" "}
                      {products.product?.categoryName}
                    </p>
                  </div>
                  <div
                    style={{ fontSize: "11px" }}
                    className="flex flex-row items-center"
                  >
                    <p className="font-bold  opacity-65 text-lg lg:text-[18px] mr-3">
                      SKU :
                    </p>
                    <p className="font-bold text-black lg:text-[16px] opacity-90">
                      {activeVariant?.sku}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-x-2 flex-wrap w-full">
                  <h3 className="font-bold text-[17px] lg:text-[20px] opacity-65 underline">
                    Déscription :{" "}
                  </h3>
                  <p className="text-[15px] lg:text-[16px] font-bold opacity-90 text-black w-full">
                    {products.product?.description}
                  </p>
                </div>
              </div>
              {/* Vérifier si la variante a des tailles */}
              <div className="flex flex-col space-y-3 sm:flex-row sm:items-start items-start  space-x-5">
                {/* // Dans la section des options de variantes, remplacez par ce code conditionnel : */}
                <div className="flex flex-col gap-2 rounded-md">
                  {/* Afficher les couleurs uniquement pour COLOR et COLOR_AND_SIZE */}
                  {(products.product?.variantType === "COLOR" ||
                    products.product?.variantType === "COLOR_AND_SIZE") && (
                    <ProductColors
                      product={products.product}
                      selectedColor={selectedColor}
                      onColorChange={(color) => {
                        // Trouver la première variante correspondant à la couleur sélectionnée
                        const newVariant = products.product?.variants?.find(
                          (v) => v.color === color
                        );
                        setSelectedColor(color);
                        setActiveVariant(newVariant);
                        setSelectedSize(null);

                        // Réinitialiser l'index du carrousel
                        setActiveIndex(0);
                      }}
                    />
                  )}
                </div>
                {(products.product?.variantType === "COLOR_AND_SIZE" ||
                  products.product?.variantType === "COLOR_AND_SIZE") &&
                  isSmUp && (
                    <Divider orientation="vertical" variant="middle" flexItem />
                  )}

                <div>
                  {/* Afficher les tailles uniquement pour SIZE et COLOR_AND_SIZE */}
                  {(products.product?.variantType === "SIZE" ||
                    products.product?.variantType === "COLOR_AND_SIZE") && (
                    <div className="flex rounded-md items-start justify-start">
                      <BasicSelect
                        name="taille"
                        options={availableSizes}
                        onSelect={(size) => setSelectedSize(size)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-6 flex w-full border-2 rounded flex-col lg:flex-row lg:justify-between lg:space-x-4 p-2 ">
              {/* Affichage conditionnel des variantes disponibles */}

              <div>
                {/* Détails techniques */}
                <h2 className="text-xl font-bold mb-3 text-center underline">
                  Détails du produit (Mis a jour ce matin)
                </h2>
                <ul className="list-disc pl-5 space-y-2">
                  {products.product?.productDetails?.attributes &&
                    Object.entries(
                      products.product.productDetails.attributes
                    ).map(([key, value]) => (
                      <li key={key} className="text-slate-950 text-sm">
                        <span className="font-bold capitalize mr-3">
                          {key}:
                        </span>
                        {value}
                      </li>
                    ))}
                </ul>
              </div>

              {/* Supprimer Divider sur mobile */}
              <Divider
                className="hidden lg:block"
                orientation="vertical"
                variant="middle"
                flexItem
              />
              {products.product?.variantType !== "NONE" && (
                <div className="mb-4">
                  <h3 className="font-semibold text-lg">
                    Options disponibles :
                  </h3>
                  {products.product?.variantType === "COLOR" && (
                    <p>
                      Couleurs :{" "}
                      {products.product.variants.map((v) => v.color).join(", ")}
                    </p>
                  )}
                  {products.product?.variantType === "SIZE" && (
                    <p>Tailles : {activeVariant?.sizes?.join(", ")}</p>
                  )}
                  {products.product?.variantType === "COLOR_AND_SIZE" && (
                    <div>
                      <p>Couleur sélectionnée : {activeVariant?.color}</p>
                      <p>
                        Tailles disponibles : {activeVariant?.sizes?.join(", ")}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Cart fonctionalities */}
          <div className="lg:col-span-1 md:col-span-5 bg-white rounded border p-2 sticky bottom-0 z-10 md:static">
            <form className="">
              <div className="flex flex-col mt-4 md:mt-10 space-y-3">
                <div className="">
                  {products.product?.variantType === "NONE" ? (
                    <h3
                      className={
                        products.product.stock > 5
                          ? "text-green-700 text-sm sm:text-base"
                          : "text-red-500 text-sm sm:text-base"
                      }
                    >
                      {products.product.stock > 5
                        ? `En stock (${products.product.stock} disponibles)`
                        : `Stock critique (${products.product.stock} restants)`}
                    </h3>
                  ) : (
                    <h3
                      className={
                        activeVariant?.stock > 5
                          ? "text-green-700 text-sm sm:text-base"
                          : "text-red-500 text-sm sm:text-base"
                      }
                    >
                      {activeVariant?.stock > 5
                        ? `En stock (${activeVariant?.stock} disponibles)`
                        : `Stock critique (${activeVariant?.stock} restants)`}
                    </h3>
                  )}
                </div>
                <Button
                  onClick={handleAddToCart}
                  variant="contained"
                  className="mt-2 bg-amber-700"
                  sx={{ bgcolor: "orange" }}
                  fullWidth // Important pour mobile
                >
                  <ShoppingCartIcon style={{ marginRight: "8px" }} />
                  Ajouter {loading && <CircularProgress size={16} />}
                </Button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
