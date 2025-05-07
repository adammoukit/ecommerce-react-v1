import axios from "axios";

const isProduction = import.meta.env.MODE === "production";

export const BASE_URL = isProduction
  ? import.meta.env.VITE_API_URL // Utilisez l'URL de production
  : "http://localhost:5454"; // Utilisez localhost en développement

// Création de l'instance Axios
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Ajouter un intercepteur pour inclure dynamiquement le JWT
api.interceptors.request.use(
  (config) => {
    const jwt = localStorage.getItem("jwt"); // Récupérer le JWT à chaque requête
    if (jwt) {
      config.headers["Authorization"] = `Bearer ${jwt}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour GÉRER LES ERREURS GLOBALEMENT
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Utilisez un router navigate au lieu de window.location
          // window.location.href = "/login"; 
          break;
        case 403:
          console.error("Accès refusé");
          break;
        case 500:
          console.error("Erreur serveur");
          break;
        default:
          console.error("Erreur inconnue");
      }
    }
    return Promise.reject(error);
  }
);
