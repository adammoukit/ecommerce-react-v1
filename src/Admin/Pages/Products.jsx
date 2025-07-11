import { getAllGlobalProducts } from "@/State/Product/Action";
import {
  Button,
  CircularProgress,
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { CheckIcon, ShieldCloseIcon } from "lucide-react";

const Products = () => {
  const dispatch = useDispatch();
  const { globalProducts, loading, error } = useSelector(
    (store) => store.products
  );

  const [expandedProductId, setExpandedProductId] = useState(null);
  const [modifiedItems, setModifiedItems] = useState({});

  // Fonction utilitaire pour formater les dates
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR"); // Format JJ/MM/AAAA
  };

  // État pour suivre les modifications

  // Fonction pour obtenir l'image principale
  const getMainImage = (media) => {
    const mainMedia = media?.find((m) => m.isMain) || media?.[0];
    return mainMedia?.url || "https://via.placeholder.com/150";
  };

  // Fonction pour basculer l'affichage des variations
  const toggleVariations = (productId) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
  };

  const setProductStockValue = (product) => {
    setStockValue(product.stock);
  };

  useEffect(() => {
    dispatch(getAllGlobalProducts());
  }, [dispatch]);

  const products = [
    {
      id: 1,
      status: "En stock",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW1yhlTpkCnujnhzP-xioiy9RdDQkKLMnMSg&s",
      sku: "SKU-12345",
      condition: "Neuf",
      name: "Smartphone Premium",
      createdDate: "2023-10-15",
      modifiedDate: "2024-01-20",
      stock: 42,
      price: "249,900",
    },
    {
      id: 2,
      status: "Rupture",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpP-oIpAQFjRMw9H7fQjMjhgC-jHIatlENFg&s",
      sku: "SKU-67890",
      condition: "Reconditionné",
      name: 'Écran 24" Full HD',
      createdDate: "2023-08-22",
      modifiedDate: "2024-02-05",
      stock: 16,
      price: "129,500",
    },
    {
      id: 3,
      status: "Rupture",
      image: "https://via.placeholder.com/80",
      sku: "SKU-67890",
      condition: "Reconditionné",
      name: 'Écran 24" Full HD',
      createdDate: "2023-08-22",
      modifiedDate: "2024-02-05",
      stock: 15,
      price: "129,500",
    },
    {
      id: 4,
      status: "Rupture",
      image: "https://via.placeholder.com/80",
      sku: "SKU-67890",
      condition: "Reconditionné",
      name: 'Écran 24" Full HD',
      createdDate: "2023-08-22",
      modifiedDate: "2024-02-05",
      stock: 11,
      price: "129,500",
    },
    {
      id: 5,
      status: "Rupture",
      image: "https://via.placeholder.com/80",
      sku: "SKU-67890",
      condition: "Reconditionné",
      name: 'Écran 24" Full HD',
      createdDate: "2023-08-22",
      modifiedDate: "2024-02-05",
      stock: 7,
      price: "129,500",
    },
    {
      id: 6,
      status: "Rupture",
      image: "https://via.placeholder.com/80",
      sku: "SKU-67890",
      condition: "Reconditionné",
      name: 'Écran 24" Full HD',
      createdDate: "2023-08-22",
      modifiedDate: "2024-02-05",
      stock: 3,
      price: "129,500",
    },
    {
      id: 7,
      status: "Rupture",
      image: "https://via.placeholder.com/80",
      sku: "SKU-67890",
      condition: "Reconditionné",
      name: 'Écran 24" Full HD',
      createdDate: "2023-08-22",
      modifiedDate: "2024-02-05",
      stock: 12,
      price: "129,500",
    },
  ];

  // Gestionnaire de changement de stock
  const handleStockChange = (e, itemId, isVariant = false) => {
    const value = e.target.value === "" ? "" : parseInt(e.target.value, 10);
    const key = isVariant ? `variant_${itemId}` : `product_${itemId}`;

    setModifiedItems((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        stock: value,
        isModified: true,
      },
    }));

    console.log("stocke change :", modifiedItems);
  };

  // Gestionnaire de changement de prix
  const handlePriceChange = (e, itemId, isVariant = false) => {
    const value = e.target.value;
    const key = isVariant ? `variant_${itemId}` : `product_${itemId}`;

    setModifiedItems((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        price: value,
        isModified: true,
      },
    }));
  };

  // Annuler les modifications
  const handleCancelItem = (itemKey) => {
    setModifiedItems((prev) => {
      const newState = { ...prev };
      delete newState[itemKey];
      return newState;
    });
  };

  // Mettre à jour l'élément (à compléter avec la logique API)
  const handleUpdateItem = (itemKey) => {
    console.log("Mise à jour de:", itemKey, "avec:", modifiedItems[itemKey]);
    // Logique de mise à jour API à implémenter ici

    // Réinitialiser la modification après mise à jour
    handleCancelItem(itemKey);
  };

  return (
    <div className="bg-slate-100 w-full h-full rounded p-1">
      <div className="flex flex-col bg-white p-2">
        <div className="p-2 flex items-center justify-between bg-white rounded  mb-4">
          <h1 className="text-3xl font-bold mb-4 opacity-80">
            Gestion du stock
          </h1>
          <div className="flex space-x-2">
            <Button size="small" variant="contained" color="primary">
              <NavLink to="/admin/settings">Ajouter une variante</NavLink>
            </Button>
            <Button size="small" variant="contained" color="primary">
              <NavLink to="/admin/products/new">Ajouter un produit</NavLink>
            </Button>
          </div>
        </div>
        <div className="flex items-center h-10  mb-4">
          <input
            type="text"
            placeholder="rechercher par nom produit, sku, etc..."
            onChange={(e) => console.log(e.target.value)}
            className="p-2  border rounded-tl-sm rounded-bl-sm w-full max-w-md h-full  focus:outline-orange-500 focus:ring-2 focus:ring-orange-500  font-bold opacity-75 text-black"
          />
          <button className="bg-orange-500 p-1 text-black h-full rounded-tr-sm rounded-br-sm font-bold px-2">
            rechercher{" "}
          </button>
        </div>
      </div>
      <div className="flex items-center p-2 border mb-4">
        <span className="text-[15px] font-bold opacity-75 mr-20">Filtres:</span>

        <div className="flex items-center mr-4 space-x-2">
          <span className="font-bold opacity-85">Statut:</span>
          <select className="border rounded p-1 mr-2 font-bold opacity-60">
            <option value="" className="font-semibold opacity-60">
              Tous les produits
            </option>
            <option value="in-stock" className="font-semibold opacity-60">
              En stock
            </option>
            <option value="out-of-stock" className="font-semibold opacity-60">
              Hors stock
            </option>
          </select>
        </div>
      </div>
      {/* Grille de produits */}
      <div className="bg-[#d8d8d8]   ">
        <div className="flex flex-col " style={{ maxHeight: "80vh" }}>
          {/* En-têtes de colonnes */}
          <div className="grid grid-cols-12 gap-2  px-2 font-bold text-black bg-gray-300 py-3 rounded-t-lg border-b-4 border-gray-500 sticky top-0 z-10">
            <div className="col-span-1 flex items-center">
              <input type="checkbox" className="mr-2" />
            </div>
            <div className="col-span-1  flex items-center text-sm font-medium opacity-75 text-blue-500">
              Status
            </div>
            <div className="col-span-1  flex items-center text-sm font-medium opacity-75 pl-5 ">
              Image
            </div>
            <div className="col-span-1 flex flex-col pl-2 justify-center">
              <div className="text-sm font-medium opacity-75 text-blue-500">
                SKU
              </div>
              
            </div>
            <div className="col-span-3 flex items-center  text-sm font-medium opacity-75 text-blue-500">
              Nom du produit
            </div>
            <div className="col-span-1 flex flex-col pl-3 justify-center ">
              <div className="text-sm font-medium opacity-75 text-blue-500">
                Création
              </div>
              <div className="text-sm font-medium opacity-75">Modification</div>
            </div>
            <div className="col-span-1 flex items-center  text-sm font-medium opacity-75 text-blue-500 pl-5">
              Stock
            </div>
            <div className="col-span-2 flex items-center pl-5 justify-start text-sm font-medium opacity-75">
              Prix (XOF)
            </div>
            <div className="col-span-1 flex items-center text-sm font-medium opacity-75">
              Actions
            </div>
          </div>

          {/* Contenu défilant */}
          <div className="overflow-y-auto">
            {/* Lignes de produits */}
            {globalProducts?.content?.map((product) => (
              <React.Fragment key={product.id}>
                <div className="grid grid-cols-12 bg-white p-3 border-b-2 cursor-pointer hover:bg-gray-100 transition-shadow">
                  {/* Checkbox */}
                  <div className="col-span-1 flex items-center">
                    <input type="checkbox" className="mr-2" />
                  </div>

                  {/* Status */}
                  <div className="col-span-1 border flex items-center justify-center w-full text-sm font-medium opacity-75">
                    {product.hasVariants ? (
                      <button
                        onClick={() => toggleVariations(product.id)}
                        className="text-blue-600 underline flex items-center justify-center"
                      >
                        {expandedProductId === product.id ? (
                          <ArrowDropDownIcon
                            sx={{
                              color: "black",
                              fontSize: "25px",
                              fontWeight: "27px",
                            }}
                          />
                        ) : (
                          <ArrowRightIcon
                            sx={{
                              color: "black",
                              fontSize: "25px",
                              fontWeight: "27px",
                            }}
                          />
                        )}{" "}
                        Variations ({product.variants.length})
                      </button>
                    ) : (
                      <>
                        <span
                          className={`inline-block w-3 h-3 rounded-full mr-2 ${
                            product.inStock ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></span>
                        {product.inStock ? "En stock" : "Rupture"}
                      </>
                    )}
                  </div>

                  {/* Image */}
                  <div className="col-span-1 rounded-sm pl-4">
                    {loading ? (
                      <CircularProgress size="30px" />
                    ) : (
                      <img
                        src={getMainImage(product.media)}
                        alt={product.name}
                        className="w-16 h-16 object-contain rounded-sm"
                      />
                    )}
                  </div>

                  {/* SKU & Condition */}
                  <div className="col-span-1 flex flex-col justify-center">
                    <div className="text-xs font-medium opacity-75">
                      {product.sku}
                    </div>
                    <div className="text-xs font-medium opacity-75 text-gray-600">
                      {product.condition}
                    </div>
                  </div>

                  {/* Nom du produit */}
                  <div className="col-span-3 text-xs font-medium opacity-75 pl-2 flex items-center justify-start">
                    {product.name}
                  </div>

                  {/* Dates */}
                  <div className="col-span-1 text-xs font-medium opacity-75 pl-5 flex flex-col justify-center">
                    <div>{formatDate(product.createdAt)}</div>
                    <div>{formatDate(product.updatedAt)}</div>
                  </div>

                  {/* Stock */}
                  <div className="col-span-1 font-mono flex items-center pl-5 ">
                    {product.hasVariants ? (
                      <span className="text-2xl font-bold pl-7 text-center flex items-center justify-center opacity-75">
                        -
                      </span>
                    ) : (
                      <input
                        type="number"
                        min="0"
                        value={
                          modifiedItems[`product_${product.id}`]?.stock ??
                          product.stock
                        }
                        onChange={(e) => {
                          let value = parseInt(e.target.value);
                          if (isNaN(value)) value = "";
                          else if (value < 0) value = 0;
                          e.target.value = value;
                          handleStockChange(e, product.id, false);
                        }}
                        step="1"
                        onKeyDown={(e) => {
                          if (["e", "E", "+", "-", ".", ","].includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        className="w-full border rounded border-gray-300   py-1 px-2 
                              hover:border-green-300 
                              focus:outline-none focus:rounded-sm focus:border-green-500 focus:ring-2 
                              transition-all duration-200 ease-in-out"
                      />
                    )}
                  </div>

                  {/* Prix */}
                  <div className="col-span-2 flex items-center justify-center text-xs font-medium opacity-75">
                    {product.hasVariants ? (
                      <span className="text-2xl font-bold text-center pr-10 flex items-center justify-center">
                        -
                      </span>
                    ) : (
                      <FormControl
                        size="small"
                        variant="filled"
                        sx={{
                          m: 0.3,
                          width: "110px",
                          "& .MuiFilledInput-root": {
                            height: "32px",
                            paddingTop: "8px",
                          },
                        }}
                      >
                        <InputLabel
                          htmlFor={product.id}
                          sx={{
                            fontSize: "1rem",
                            transform: "translate(10px, 8px) scale(1)",
                            "&.Mui-focused, &.MuiFormLabel-filled": {
                              transform: "translate(10px, -7px) scale(0.75)",
                            },
                          }}
                        >
                          Prix
                        </InputLabel>
                        <FilledInput
                          id={product.id}
                          value={
                            modifiedItems[`product_${product.id}`]?.price ??
                            (product.minPrice !== null
                              ? product.minPrice
                              : product.price
                            ).toFixed(2)
                          }
                          onChange={(e) =>
                            handlePriceChange(e, product.id, false)
                          }
                          startAdornment={
                            <InputAdornment
                              position="start"
                              sx={{
                                "& .MuiTypography-root": { fontSize: "1rem" },
                                padding: "6px 0 15px",
                              }}
                            >
                              XOF
                            </InputAdornment>
                          }
                          sx={{
                            fontSize: "0.8rem",
                            "& .MuiInputBase-input": {
                              padding: "6px 0 3px",
                              paddingLeft: "4px",
                            },
                          }}
                        />
                      </FormControl>
                    )}
                  </div>

                  {/* Actions */}
                  {/* Actions */}
                  <div className="col-span-1 flex items-center  justify-center space-x-2">
                    {modifiedItems[`product_${product.id}`]?.isModified ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            handleUpdateItem(`product_${product.id}`)
                          }
                          className="text-green-600 hover:text-green-900"
                        >
                          <CheckIcon style={{ fontSize: "1.2rem" }} />
                        </button>
                        <button
                          onClick={() =>
                            handleCancelItem(`product_${product.id}`)
                          }
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <ShieldCloseIcon style={{ fontSize: "1.2rem" }} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <button className="text-blue-600 hover:text-blue-900">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
                {/* Affichage des variations si le produit est développé */}
                {/* Affichage des variations comme produits normaux */}
                {/* Affichage des variations */}
                {expandedProductId === product.id && product.hasVariants && (
                  <div className="w-full">
                    {product.variants.map((variant) => {
                      const variantKey = `variant_${variant.id}`;
                      const isVariantModified =
                        modifiedItems[variantKey]?.isModified;
                      return (
                        <div
                          key={variant.id}
                          className="grid grid-cols-12 gap-2 space-x-2 bg-gray-200 p-3 border-b hover:bg-gray-300"
                        >
                          {/* Checkbox */}
                          <div className="col-span-1 flex items-center">
                            <input type="checkbox" className="mr-2" />
                          </div>

                          {/* Status de la variation */}
                          <div className="col-span-1 flex items-center justify-center text-xs font-medium opacity-75">
                            <span
                              className={`inline-block w-3 h-3 rounded-full mr-2 ${
                                variant.inStock ? "bg-green-500" : "bg-red-500"
                              }`}
                            ></span>
                            {variant.inStock ? "En stock" : "Rupture"}
                          </div>

                          {/* Image de la variation */}
                          <div className="col-span-1 flex items-center pl-4">
                            {loading ? (
                              <CircularProgress size="30px" />
                            ) : (
                              <img
                                src={getMainImage(variant.media)}
                                alt={`Variation ${variant.color}`}
                                className="w-16 h-16 object-contain"
                              />
                            )}
                          </div>

                          {/* SKU de la variation */}
                          <div className="col-span-1 flex flex-col justify-center">
                            <div className="text-xs font-medium opacity-75">
                              {variant.sku}
                            </div>
                           
                          </div>

                          {/* Détails de la variation */}
                          <div className="col-span-3 text-xs font-medium opacity-75 flex items-center justify-start">
                            {product.name} - {variant.color}{" "}
                            {variant.size ? `(${variant.size})` : ""}
                          </div>

                          {/* Dates (mêmes que le produit principal) */}
                          <div className="col-span-1 text-xs font-medium opacity-75 pl-5 flex flex-col justify-center">
                            <div>{formatDate(product.createdAt)}</div>
                            <div>{formatDate(product.updatedAt)}</div>
                          </div>

                          {/* Stock de la variation */}
                          <div className="col-span-1 font-mono flex items-center pl-5 w-[90px]">
                            <input
                              type="number"
                              min="0"
                              value={
                                modifiedItems[variantKey]?.stock ??
                                variant.stock
                              }
                              step="1"
                              onKeyDown={(e) => {
                                if (
                                  ["e", "E", "+", "-", ".", ","].includes(e.key)
                                ) {
                                  e.preventDefault();
                                }
                              }}
                              onChange={(e) => {
                                let value = parseInt(e.target.value);
                                if (isNaN(value)) value = "";
                                else if (value < 0) value = 0;
                                e.target.value = value;
                                handleStockChange(e, variant.id, true);
                              }}
                              className="w-full border border-gray-300   py-1 px-2 
                            hover:border-green-300 
                            focus:outline-none focus:border-green-500 focus:ring-2 
                            transition-all duration-200 ease-in-out"
                            />
                          </div>

                          {/* Prix de la variation */}
                          <div className="col-span-2 flex items-center justify-center text-xs font-medium opacity-75">
                            <FormControl
                              size="small"
                              variant="filled"
                              sx={{
                                m: 0.3,
                                width: "110px",
                                "& .MuiFilledInput-root": {
                                  height: "32px",
                                  paddingTop: "8px",
                                },
                              }}
                            >
                              <InputLabel
                                htmlFor={`price-${variant.id}`}
                                sx={{
                                  fontSize: "1rem",
                                  transform: "translate(10px, 8px) scale(1)",
                                  "&.Mui-focused, &.MuiFormLabel-filled": {
                                    transform:
                                      "translate(10px, -7px) scale(0.75)",
                                  },
                                }}
                              >
                                Prix
                              </InputLabel>
                              <FilledInput
                                id={`price-${variant.id}`}
                                value={
                                  modifiedItems[variantKey]?.price ??
                                  variant.finalPrice.toFixed(2)
                                }
                                onChange={(e) =>
                                  handlePriceChange(e, variant.id, true)
                                }
                                startAdornment={
                                  <InputAdornment
                                    position="start"
                                    sx={{
                                      "& .MuiTypography-root": {
                                        fontSize: "1rem",
                                      },
                                      padding: "6px 0 15px",
                                    }}
                                  >
                                    XOF
                                  </InputAdornment>
                                }
                                sx={{
                                  fontSize: "0.8rem",
                                  "& .MuiInputBase-input": {
                                    padding: "6px 0 3px",
                                    paddingLeft: "4px",
                                  },
                                }}
                              />
                            </FormControl>
                          </div>

                          {/* Actions pour la variation */}
                          <div className="col-span-1 flex items-center  justify-center space-x-2">
                            {isVariantModified ? (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleUpdateItem(variantKey)}
                                  className="text-green-600 hover:text-green-800"
                                >
                                  <CheckIcon style={{ fontSize: "1.2rem" }} />
                                </button>
                                <button
                                  onClick={() => handleCancelItem(variantKey)}
                                  className="text-gray-500 hover:text-gray-700"
                                >
                                  <ShieldCloseIcon
                                    style={{ fontSize: "1.2rem" }}
                                  />
                                </button>
                              </div>
                            ) : (
                              <>
                                <button className="text-blue-600 hover:text-blue-900">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                  </svg>
                                </button>
                                <button className="text-red-600 hover:text-red-900">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
