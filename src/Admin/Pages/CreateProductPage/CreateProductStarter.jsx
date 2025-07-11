import React, { useEffect, useRef, useState } from "react";
import NewProductImageStarter from "../../../assets/New_Product_Starter.jpeg";
import { Backdrop, Button, CircularProgress, Input } from "@mui/material";
import CategorySelector2 from "@/Admin/Components/Form/CategorySelector2";
import { Box } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { api } from "@/Config/ApiConfig";
import {
  clearProductTypeSuggestions,
  searchProductTypeSuggestions,
} from "@/State/Product/Action";
import { useDispatch, useSelector } from "react-redux";

const CreateProductStarter = () => {
  const [open, setOpen] = React.useState(false);
  const [openDescription, setOpenDescription] = useState(true);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  // const [suggestions, setSuggestions] = useState([]);
  const debounceTimer = useRef(null);
  const dispatch = useDispatch();

  // Accéder aux suggestions depuis le state Redux
  const { productTypeSuggestions } = useSelector((store) => store.products);
  const { loading, data: suggestions } = productTypeSuggestions;

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    categoryId: "",
    price: "",
    sku: "",
    stock: "",
    hasVariants: false,
    variantType: "NONE",
    variants: [],
  });

  const handleCategoryChange = (selectedCategoryId) => {
    setProductData({ ...productData, categoryId: selectedCategoryId });
    console.log("productData", productData);
    window.alert("product ID :", selectedCategoryId);
  };

  // Données de démonstration avec plusieurs hiérarchies pour le même type de produit
  const mockSuggestions = [
    {
      productType: "TEA",
      hierarchy:
        "Home & kitchen > Kitchen & dining > coffee, tea & espresso > coffee & Tea > Tea Samplers",
    },
    {
      productType: "TEA",
      hierarchy: "Grocery & Gourmet Food > Beverages > Tea > Tea Samplers",
    },
    {
      productType: "TEA",
      hierarchy:
        "Home & kitchen > Kitchen & dining > coffee, tea & espresso > coffee & Tea > Fruit & Herbal Tea > Herbal",
    },
    {
      productType: "Ordinateur Portable",
      hierarchy: "Électronique > Informatique > Ordinateurs portables > Gaming",
    },
    {
      productType: "Ordinateur Portable",
      hierarchy: "Électronique > Informatique > Ordinateurs portables > Bureau",
    },
    {
      productType: "Fer à repasser",
      hierarchy:
        "Maison > Électroménager > Repassage et couture > Fers à repasser",
    },
  ];

  const handleOpen = (suggestion) => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      navigate("/admin/products/new/nouveau-produit", {
        state: {
          productType: suggestion.productType,
          selectedCategoryPath: suggestion.hierarchy,
        },
      });
    }, 5000);
  };

  // const fetchSuggestions = (query) => {
  //   if (query.length < 2) {
  //     setSuggestions([]);
  //     return;
  //   }

  //   const q = query.toLowerCase();
  //   const filtered = mockSuggestions.filter(
  //     (suggestion) =>
  //       suggestion.productType.toLowerCase().includes(q) ||
  //       suggestion.hierarchy.toLowerCase().includes(q)
  //   );

  //   setSuggestions(filtered);
  // };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    clearTimeout(debounceTimer.current);

    if (value.length < 2) {
      dispatch(clearProductTypeSuggestions());
      return;
    }

    debounceTimer.current = setTimeout(() => {
      dispatch(searchProductTypeSuggestions(value));
    }, 300);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.productType);
    handleOpen(suggestion);
    setSuggestions([]);
    // Ici vous pourriez pré-sélectionner une catégorie si nécessaire
  };

  // Nettoyage du timer
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <div className="bg-slate-100 w-full overflow-y-scroll h-full  px-2 py-4 rounded flex flex-col items-center justify-start">
      <div className="flex flex-col lg:flex-row items-center lg:space-x-5 lg:justify-between lg:items-start ">
        <img
          src={NewProductImageStarter}
          alt=""
          className="rounded-lg w-[200px] h-[200px] mb-6"
        />
        <div>
          <h1 className="text-2xl md:text-3xl font-medium text-center mb-4">
            Bienvenue dans la page de création de produit !
          </h1>

          <div className="w-full max-w-[700px] space-y-4 relative">
            <div className="relative">
              {" "}
              {/* Nouveau conteneur relatif */}
              <div className="border-2 bg-white rounded-sm flex">
                <Input
                  type="text"
                  className="flex-1 p-2"
                  placeholder="Saisissez un type de produit. Exemple : fer à repasser"
                  fullWidth
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <Button
                  sx={{
                    bgcolor: "orange",
                    color: "white",
                    fontWeight: "bold",
                    "&:hover": { bgcolor: "darkorange" },
                    minWidth: "120px",
                  }}
                >
                  <SearchIcon />
                </Button>
              </div>
              {loading && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 shadow-lg z-50 mt-1 p-3">
                  Chargement des suggestions...
                </div>
              )}
              {/* Suggestions de catégories - Version Amazon */}
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div className="font-semibold text-blue-600">
                        Type de produit:{" "}
                        <span className="px-2 rounded bg-orange-500 text-black font-bold">
                          {suggestion.productType}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {suggestion.hierarchy}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Fin du nouveau conteneur */}

            {/* Description détaillée - Toujours visible */}
            {openDescription && (
              <div className="bg-white p-4 rounded-md shadow-sm">
                <p className="italic text-gray-600 mb-3">
                  💡Parcourez les categories disponibles et choisissez la
                  catgorie qui correspond à votre produit. Notre système vous
                  proposera ensuite une hiérarchie de catégories précise adaptée
                  à votre contexte.
                </p>

                <div className="">
                  <div className="text-sm text-gray-500">
                    <div className="">
                      <CategorySelector2
                        handleCategorySelection={handleCategoryChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <span className="font-semibold">
                    Ce que vous obtiendrez :
                  </span>
                  <div className="flex flex-col lg:flex-row lg:space-x-3 lg:p-2 border-2">
                    <h3 className="italic mr-3  font-semibold w-[30%]">
                      Exemple :
                    </h3>
                    <span className="italic w-full">
                      Électronique &gt; Informatique &gt; Ordinateurs portables
                      &gt; Gaming
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-xs text-gray-400">
                  Vous pourrez affiner la catégorisation précise après cette
                  première étape
                </p>
              </div>
            )}
          </div>

          <Backdrop
            sx={(theme) => ({
              color: "#fff",
              zIndex: theme.zIndex.drawer + 1,
              backdropFilter: "blur(3px)",
            })}
            open={open}
          >
            <div className="text-center">
              <CircularProgress color="inherit" />
              <p className="mt-4 text-lg">
                Analyse de la catégorie en cours...
              </p>
            </div>
          </Backdrop>
        </div>
      </div>
    </div>
  );
};

export default CreateProductStarter;
