import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import IdentificationForm from "./Identification/IdentificationForm";
import CustomTabsNavigator from "./Identification/CustomTabsNavigator";
import DescriptionForm from "./Identification/DescriptionForm";
import Variante from "./Identification/Variante";
import DetailProduitForm from "./Identification/DetailProduitForm";
import ProductImages from "./Identification/ProductImages";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useLocation } from "react-router-dom";

const CreateProductTabs = () => {
  const [value, setValue] = React.useState("1");
  const [attributesMetadata, setAttributesMetadata] = useState([]);

  const location = useLocation();

  const productTypeFromStarter = location.state?.productType || "";
  const fullPath = location.state?.selectedCategoryPath || "";

  // Ajouter une fonction pour charger les métadonnées
  const loadAttributes = async (categoryId, productTypeId) => {
    try {
      const params = new URLSearchParams();
      if (categoryId) params.append("categoryId", categoryId);
      if (productTypeId) params.append("productTypeId", productTypeId);

      const response = await axios.get(`/api/attributes?${params}`);
      setAttributesMetadata(response.data);
    } catch (error) {
      console.error("Error loading attributes:", error);
    }
  };

  const [productData, setProductData] = useState({
    identification: {
      name: "",
      price: "",
      brand: "",
      productType: productTypeFromStarter,
      hasVariants: false,
      fullPath: fullPath, // Chemin complet de la catégorie
    },
    description: "",
    variations: {
      type: null,
      options: [],
    },
    details: {
      attributes: {},
      category: null,
      productType: null,
    },
    mainImage: [], // Pour l'image principale (tableau d'un seul élément)
    images: {}, // Changé de [] à {} pour stocker par clé de variante
  });

  // Charger les attributs quand la catégorie ou le type change
  useEffect(() => {
    if (productData.details.category || productData.details.productType) {
      loadAttributes(
        productData.details.category?.id,
        productData.details.productType?.id
      );
    }
  }, [productData.details.category, productData.details.productType]);

  const buttonSuiv = () => {
    const current = Number(value);
    let nextValue;

    // Logique de saut pour l'onglet Variations (3)
    if (current === 2 && !productData.identification.hasVariants) {
      nextValue = "4"; // Saute directement à l'onglet 4
    } else {
      nextValue = String(current + 1);
    }

    setValue(nextValue);
  };

  const buttonPrev = () => {
    const current = Number(value);
    let prevValue;

    // Logique inverse pour le retour
    if (current === 4 && !productData.identification.hasVariants) {
      prevValue = "2"; // Retourne directement à l'onglet 2
    } else {
      prevValue = String(current - 1);
    }

    setValue(prevValue);
  };

  // Mise à jour centralisée des données
  const updateProductData = (section, field, value) => {
    // Cas spécial pour les images principales
    if (section === "mainImage") {
      setProductData((prev) => ({
        ...prev,
        mainImage: value,
      }));
      return;
    }
    // Cas spécial pour les images
    if (section === "images") {
      // Si field est une string, on met à jour une clé spécifique
      if (typeof field === "string") {
        setProductData((prev) => ({
          ...prev,
          images: {
            ...prev.images,
            [field]: value,
          },
        }));
      }
      // Si field est un objet, on remplace complètement l'objet images
      else if (typeof field === "object") {
        setProductData((prev) => ({
          ...prev,
          images: field,
        }));
      }
      return;
    }
    setProductData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        typography: "body1",
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList aria-label="lab API tabs example">
            <Tab
              sx={{ fontWeight: "bold" }}
              label="Identification du produit"
              value="1"
            />
            <Tab sx={{ fontWeight: "bold" }} label="Desription" value="2" />
            <Tab
              sx={{ fontWeight: "bold" }}
              label="Variantions"
              value="3"
              disabled={productData.identification.hasVariants === false}
            />
            <Tab
              sx={{ fontWeight: "bold" }}
              label="Détails du produit"
              value="4"
              icon={<ErrorOutlineIcon sx={{ color: "red" }} />}
              iconPosition="end"
            />
            <Tab sx={{ fontWeight: "bold" }} label="Images" value="5" />
          </TabList>
        </Box>
        <div className="  lg:px-[60px] ">
          <TabPanel value="1">
            <IdentificationForm
              data={productData.identification}
              updateData={(field, value) =>
                updateProductData("identification", field, value)
              }
            />
          </TabPanel>
          <TabPanel value="2">
            <DescriptionForm
              data={productData.description}
              updateData={(value) =>
                updateProductData("description", "", value)
              }
            />
          </TabPanel>
          <TabPanel value="3">
            <Variante
              data={productData.variations}
              updateData={(field, value) =>
                updateProductData("variations", field, value)
              }
              productData={productData}
            />
          </TabPanel>
          <TabPanel value="4">
            <DetailProduitForm
              attributesMetadata={attributesMetadata}
              data={productData.details}
              updateData={(field, value) =>
                updateProductData("details", field, value)
              }
            />
          </TabPanel>
          <TabPanel value="5">
            <ProductImages
              productData={productData}
              updateProductData={updateProductData}
            />
          </TabPanel>
          <CustomTabsNavigator
            value={value}
            handleSuivant={buttonSuiv}
            handlePrev={buttonPrev}
            productData={productData}
          />
        </div>
      </TabContext>
    </Box>
  );
};

export default CreateProductTabs;
