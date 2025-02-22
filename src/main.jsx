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

// Load your Stripe public key
const stripePromise = loadStripe(
  "pk_test_51QD3VGHQIEJnsrz39hVwWuMnW0Pee9vcyA6xrgO4weSKs55UpwBxjIrbqQgpnT10z3AdDlf8jHc84WAvJL2xAOlM00pbrPYgNZ"
);

// Créer un thème personnalisé (optionnel)
const them = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#ff4081",
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={them}>
      <BrowserRouter>
        <Provider store={store}>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
