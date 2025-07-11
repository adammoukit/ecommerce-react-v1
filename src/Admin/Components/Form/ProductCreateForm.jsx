import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import CategorySelector2 from "./CategorySelector2";

const ProductCreateForm = () => {
  const [activeStep, setActiveStep] = useState(0);
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

  const [steps, setSteps] = useState([
    "Propriétés de base",
    "Gestion des medias",
  ]);

  const handleVariantToggle = (e) => {
    const isChecked = e.target.checked;
    const newVariantType = isChecked ? "COLOR" : "NONE";

    setProductData({
      ...productData,
      hasVariants: isChecked,
      variantType: newVariantType,
    });

    if (isChecked) {
      if (!steps.includes("Gestion des variantes")) {
        setSteps([
          "Propriétés de base",
          "Gestion des variantes",
          "Gestion des medias",
        ]);
      }
    } else {
      setSteps(["Propriétés de base", "Gestion des medias"]);
      if (activeStep === 1) setActiveStep(0); // Revient à l'étape précédente si "Gestion des variantes" est désactivée
    }
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...productData.variants];
    updatedVariants[index][field] = value;
    setProductData({ ...productData, variants: updatedVariants });
  };

  const addVariant = () => {
    const baseVariant = {
      stock: "",
      additionalPrice: "",
      sku: "",
    };

    let newVariant;
    switch (productData.variantType) {
      case "COLOR":
        newVariant = { ...baseVariant, value: "" };
        break;
      case "SIZE":
        newVariant = { ...baseVariant, value: "" };
        break;
      case "COLOR_AND_SIZE":
        newVariant = { ...baseVariant, color: "", size: "" };
        break;
      default:
        newVariant = baseVariant;
    }

    setProductData({
      ...productData,
      variants: [...productData.variants, newVariant],
    });
  };

  const removeVariant = (index) => {
    const updatedVariants = [...productData.variants];
    updatedVariants.splice(index, 1);
    setProductData({ ...productData, variants: updatedVariants });
  };

  const handleCategoryChange = (selectedCategoryId) => {
    setProductData({ ...productData, categoryId: selectedCategoryId });
    console.log("productData", productData);
    window.alert("product ID :", selectedCategoryId);
  };

  return (
    <Box
      sx={{
        width: "65%",
        margin: "auto",
        mt: 4,
        border: "dashed",
        padding: "30px",
        borderRadius: "5px",
        bgcolor: "#f2f3f4",
      }}
    >
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography
            sx={{ fontSize: "30px", width: "100%", bgcolor: "silver" }}
            variant="h6"
            className="text-center font-bold capitalize rounded"
          >
            Propriétés de base
          </Typography>

          <div className="flex flex-col items-start ">
            <FormControlLabel
              control={
                <Checkbox
                  checked={productData.hasVariants}
                  onChange={handleVariantToggle}
                />
              }
              label="Ce produit a des variantes ?"
              sx={{ mt: 2, mb: 3 }}
            />
            {productData.hasVariants && (
              <FormControl component="fieldset" sx={{ mb: 3 }}>
                <FormLabel component="legend">Type de variation</FormLabel>
                <RadioGroup
                  row
                  value={productData.variantType}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      variantType: e.target.value,
                    })
                  }
                >
                  <FormControlLabel
                    value="COLOR"
                    control={<Radio />}
                    label="Couleur"
                  />
                  <FormControlLabel
                    value="SIZE"
                    control={<Radio />}
                    label="Taille"
                  />
                  <FormControlLabel
                    value="COLOR_AND_SIZE"
                    control={<Radio />}
                    label="Couleur + Taille"
                  />
                </RadioGroup>
              </FormControl>
            )}
          </div>
          <TextField
            fullWidth
            label="Nom du produit"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            placeholder="exemple : Iphone 15 Pro"
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            rows={4}
            label="Description"
            name="description"
            multiline
            value={productData.description}
            onChange={handleInputChange}
            sx={{ mt: 2 }}
          />
          <Box sx={{ mt: 2 }}>
            <CategorySelector2 handleCategorySelection={handleCategoryChange} />
          </Box>
          <TextField
            fullWidth
            label="Prix"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            type="number"
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="SKU"
            name="sku"
            value={productData.sku}
            onChange={handleInputChange}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Stock"
            name="stock"
            value={productData.stock}
            onChange={handleInputChange}
            type="number"
            sx={{ mt: 2 }}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button disabled>Retour</Button>
            <Button variant="contained" onClick={handleNext}>
              Suivant
            </Button>
          </Box>
        </Box>
      )}
      {productData.hasVariants && activeStep === 1 && (
        <Box sx={{ mt: 4 }}>
          <Typography
            sx={{
              fontSize: "30px",
              width: "100%",
              bgcolor: "silver",
              marginBottom: "20px",
            }}
            variant="h6"
            className="text-center font-bold capitalize rounded"
          >
            Gestion des variantes
          </Typography>
          {productData.hasVariants ? (
            <>
              <Button variant="outlined" onClick={addVariant} sx={{ mt: 2 }}>
                Ajouter une variante <AddIcon />
              </Button>
              <Table sx={{ mt: 2 }}>
                <TableHead>
                  <TableRow>
                    {/* Colonne dynamique selon le type */}
                    {productData.variantType === "COLOR_AND_SIZE" ? (
                      <>
                        <TableCell>Couleur</TableCell>
                        <TableCell>Taille</TableCell>
                      </>
                    ) : (
                      <TableCell>
                        {productData.variantType === "COLOR"
                          ? "Couleur"
                          : "Taille"}
                      </TableCell>
                    )}
                    <TableCell>Qte</TableCell>
                    <TableCell>Prix additionnel</TableCell>
                    <TableCell>SKU</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productData.variants.map((variant, index) => (
                    <TableRow key={index}>
                      {/* Colonnes dynamiques */}
                      {productData.variantType === "COLOR_AND_SIZE" ? (
                        <>
                          <TableCell>
                            <TextField
                              value={variant.color}
                              onChange={(e) =>
                                handleVariantChange(
                                  index,
                                  "color",
                                  e.target.value
                                )
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={variant.size}
                              onChange={(e) =>
                                handleVariantChange(
                                  index,
                                  "size",
                                  e.target.value
                                )
                              }
                            />
                          </TableCell>
                        </>
                      ) : (
                        <TableCell>
                          <TextField
                            value={variant.value}
                            onChange={(e) =>
                              handleVariantChange(
                                index,
                                "value",
                                e.target.value
                              )
                            }
                          />
                        </TableCell>
                      )}

                      {/* Colonnes fixes */}
                      <TableCell>
                        <TextField
                          type="number"
                          value={variant.stock}
                          onChange={(e) =>
                            handleVariantChange(index, "stock", e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={variant.additionalPrice}
                          onChange={(e) =>
                            handleVariantChange(
                              index,
                              "additionalPrice",
                              e.target.value
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={variant.sku}
                          onChange={(e) =>
                            handleVariantChange(index, "sku", e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => removeVariant(index)}
                          color="error"
                        >
                          <RemoveIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          ) : (
            <Typography>
              Pas de variantes définies. Vous pouvez modifier les propriétés de
              base.
            </Typography>
          )}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button variant="contained" onClick={handleBack}>
              Retour
            </Button>
            <Button variant="contained" onClick={handleNext}>
              Suivant
            </Button>
          </Box>
        </Box>
      )}
      {activeStep === steps.length - 1 && (
        <Box sx={{ mt: 4 }}>
          <Typography
            sx={{
              fontSize: "30px",
              width: "100%",
              bgcolor: "silver",
              marginBottom: "20px",
            }}
            variant="h6"
            className="text-center font-bold capitalize rounded"
          >
            Gestion des médias
          </Typography>
          {productData.hasVariants ? (
            <Button variant="outlined" sx={{ mt: 2 }}>
              Ajouter des images à chaque variante <AddIcon />
            </Button>
          ) : (
            <Typography>Ajouter des images au produit</Typography>
          )}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button variant="contained" onClick={handleBack}>
              Retour
            </Button>
            <Button
              variant="contained"
              onClick={() => console.log(productData)}
            >
              Soumettre
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProductCreateForm;
