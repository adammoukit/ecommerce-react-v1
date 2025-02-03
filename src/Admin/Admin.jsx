import { useTheme } from "@emotion/react";
import {
  CssBaseline,
  Divider,
  Drawer,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreIcon from "@mui/icons-material/Store";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import Dashboard from "./Components/Dashboard";
import CreateProductForm from "./Components/CreateProductForm";
import ProductsTable from "./Components/ProductsTable";
import OrderTable from "./Components/OrderTable";
import CustomerTable from "./Components/CustomerTable";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ProductCreateForm from "./Components/Form/ProductCreateForm";

const menu = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: <DashboardIcon sx={{ color: "orange" }} />,
  },
  { name: "Produits", path: "/admin/products", icon: <StoreIcon /> },
  {
    name: "Clients",
    path: "/admin/customers",
    icon: <PeopleOutlineIcon sx={{ color: "yellow" }} />,
  },
  {
    name: "Commandes",
    path: "/admin/orders",
    icon: <DashboardIcon />,
  },
  {
    name: "Ajouter un produit",
    path: "/admin/product/create",
    icon: <AddCircleRoundedIcon sx={{ color: "green" }} />,
  },
];

const drawerWidth = 240; // Largeur du Drawer

const Admin = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const navigate = useNavigate();

  const drawer = (
    <Box
      sx={{
        width: drawerWidth,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#242B2E",
        color: "#fff",
        height: "100vh", // Assure que le Drawer occupe toute la hauteur de la fenêtre
      }}
    >
      {/* Liste principale */}
      <List sx={{ flexGrow: 1 }}>
        {" "}
        {/* Permet à cette liste d'utiliser l'espace disponible */}
        {menu.map((item) => (
          <ListItem
            key={item.name}
            disablePadding
            onClick={() => navigate(item.path)}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Profil placé en bas */}
      <Divider sx={{ opacity : "1", backgroundColor:"white" }}  />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PersonPinIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* Drawer permanent */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
        {/* Contenu principal */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            boxSizing: "border-box",
          }}
        >
          {/* <Toolbar /> */}
          {/* Ajoutez ici votre contenu principal */}
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route
              path="/product/create"
              element={<ProductCreateForm />}
            ></Route>
            <Route path="/products" element={<ProductsTable />}></Route>
            <Route path="/Orders" element={<OrderTable />}></Route>
            <Route path="/customer" element={<CustomerTable />}></Route>
          </Routes>
        </Box>
      </Box>
    </div>
  );
};

export default Admin;
