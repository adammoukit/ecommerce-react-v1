import React, { useState } from "react";
import ProductsTable from "./ProductsTable";
import {
  Button,
  Card,
  CardHeader,
  FormControl,
  Grid,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createProduct } from "../../State/Product/Action";
import { data } from "autoprefixer";
import Paper from "@mui/material/Paper";

const initialState = [
  { name: "S", quantite: "" },
  { name: "M", quantite: "" },
  { name: "L", quantite: "" },
];
const CreateProductForm = () => {
  const [productData, setProductData] = useState({
    imageUrl: "",
    brand: "",
    title: "",
    color: "",
    discountedPrice: "",
    price: "",
    discountPercent: "",
    size: initialState,
    quantity: "",
    topLavelCategory: "",
    secondLavelCategory: "",
    thirdLavelCategory: "",
    description: "",
  });

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSizeChange = (e, index) => {
    let { name, value } = e.target;
    name = name === "size_quantity" ? "quantite" : name;

    const sizes = [...productData.size];
    sizes[index][name] = value;
    setProductData((preveData) => ({
      ...preveData,
      size: sizes,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Transformer les tailles au format attendu
    const formattedSizes = productData.size.map((s) => ({
      name: s.name,
      quantite: parseInt(s.quantite, 10), // Assurez-vous que c'est un nombre
    }));
  
    // Préparer les données finales
    const formattedProductData = {
      ...productData,
      size: formattedSizes, // Ajout des tailles transformées
    };
  
    dispatch(createProduct(formattedProductData));
  };
  

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  return (
    <div>
      <Typography
        variant="h3"
        sx={{ textAlign: "center" }}
        className="py-3 text-center"
      >
        Ajouter un produit
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="createProductContainer min-h-screen"
      >
        <Grid container spacing={2}>
          {/* Première colonne */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="text"
              label="Image url"
              name="imageUrl"
              value={productData.imageUrl}
              onChange={handleChange}
            />
          </Grid>
          {/* Deuxième colonne */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="text"
              label="Brand"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
            />
          </Grid>
          {/* Troisième élément en pleine largeur */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="text"
              label="Title"
              name="title"
              value={productData.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="text"
              label="Couleur"
              name="color"
              value={productData.color}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Quantité"
              name="quantity"
              value={productData.quantity}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Prix"
              name="price"
              value={productData.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="prix réduit "
              name="discountedPrice"
              value={productData.discountedPrice}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Pourcentage de reduction"
              name="discountPercent"
              value={productData.discountPercent}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Categorie 1</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={productData.topLavelCategory}
                label="Categorie 1"
                onChange={handleChange}
                name="topLavelCategory"
              >
                <MenuItem value="men">Homme</MenuItem>
                <MenuItem value="women">Femme</MenuItem>
                <MenuItem value="kids">Enfants</MenuItem>
                <MenuItem value="Sports">Sports</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Categorie 2</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={productData.secondLavelCategory}
                label="Categorie 2"
                onChange={handleChange}
                name="secondLavelCategory"
              >
                <MenuItem value="Clothings">Clothings</MenuItem>
                <MenuItem value="Accessories">Accessories</MenuItem>
                <MenuItem value="Brands">Brands</MenuItem>
                <MenuItem value="Maillots">Maillots</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Categorie 3</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={productData.thirdLavelCategory}
                label="Categorie 3"
                onChange={handleChange}
                name="thirdLavelCategory"
              >
                <MenuItem value="PSG">PSG</MenuItem>
                <MenuItem value="REAL MADRID">REAL MADRID</MenuItem>
                <MenuItem value="man_city">MAN CITY</MenuItem>
                <MenuItem value="arsenal">ARSENAL</MenuItem>
                <MenuItem value="tottenham">TOTTENHAM</MenuItem>

              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type=""
              label="Description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              rows={3}
              multiline
            />
          </Grid>
          {productData.size.map((size, index) => (
            <Grid container item spacing={3} key={`size-${index}`}>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  label="Taille"
                  name="name"
                  value={size.name}
                  onChange={(event) => handleSizeChange(event, index)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Quantité"
                  fullWidth
                  name="size_quantity"
                  value={size.quantite}
                  type="number"
                  onChange={(event) => handleSizeChange(event, index)}
                  required
                />
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12}>
                <Button
                variant="contained"
                className="py-20"
                size="large"
                type="submit"
                >
                  Ajouter
                </Button>
              </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateProductForm;
