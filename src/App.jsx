import { Box } from "@mui/material";
import "./App.css";
import Footer from "./customer/components/Footer/Footer";
import Navigation from "./customer/components/Navigation/Navigation";
import { Route, Routes, useLocation } from "react-router-dom";
import CustomerRouters from "./Routes/CustomerRouters";
import AdminRoutes from "./Routes/AdminRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation(); // Obtenir l'URL actuelle

  // Vérifier si le chemin commence par "/admin"
  const isAdminPath = location.pathname.startsWith("/admin");
  const isLoginPage = location.pathname === "/auth/login"; // Modification ici
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Pour que le footer soit en bas
      }}
    >
      {/* ToastContainer pour afficher les notifications */}
      <ToastContainer
        style={{ marginTop: "30px" }}
        position="top-right"
        autoClose={3000}
      />
      {/* Afficher Navigation seulement si ce n'est pas un chemin admin */}
      {!isAdminPath && <Navigation />}

      <Box sx={{ flex: "1" }}>
        <Routes>
          <Route path="/*" element={<CustomerRouters />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </Box>

      {/* Afficher Footer seulement si ce n'est pas un chemin admin */}
      {!isAdminPath && !isLoginPage && <Footer />}

      
    </Box>
  );
}

export default App;
