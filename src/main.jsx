import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./State/store.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Configuration Stripe avec gestion d'erreur
const stripePromise = loadStripe(
  "pk_test_51QD3VGHQIEJnsrz39hVwWuMnW0Pee9vcyA6xrgO4weSKs55UpwBxjIrbqQgpnT10z3AdDlf8jHc84WAvJL2xAOlM00pbrPYgNZ"
).catch((error) => {
  console.error("Stripe initialization failed:", error);
  return null;
});

// Thème MUI complet
const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#ff4081" }
  },
  typography: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    button: { textTransform: "none" }
  }
});

// Désactivez StrictMode temporairement
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);