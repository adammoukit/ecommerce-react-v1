import { Box } from "@mui/material";
import "./App.css";
import Footer from "./customer/components/Footer/Footer";
import Navigation from "./customer/components/Navigation/Navigation";
import HomePage from "./customer/Pages/HomePage/HomePage";
import Product from "./customer/components/Product/Product";

import Cart from "./customer/components/Cart/Cart";
import CheckOut from "./customer/components/CheckOut/CheckOut";
import Order from "./customer/components/Order/Order";
import OrderDetails from "./customer/components/Order/OrderDetails";
import { Route, Routes } from "react-router-dom";
import CustomerRouters from "./Routes/CustomerRouters";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Pour que le footer soit en bas
      }}
    >
      <Navigation />
      <Box sx={{ flex: "1" }}>
        <Routes>
          <Route path="/*" element={<CustomerRouters />} />
        </Routes>{" "}
       
      </Box>
      <Footer /> {/* Toujours collé en bas */}
    </Box>
  );
}

export default App;
