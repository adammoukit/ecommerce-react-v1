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

// // Ajouter un intercepteur de réponse pour gérer les erreurs globalement
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       // Gestion spécifique des erreurs 401 ou 403 (JWT expiré ou invalide)
//       if (error.response.status === 401 || error.response.status === 403) {
//         // Effectuer automatiquement le logout
//         localStorage.clear(); // Supprimer le JWT et autres données
//         window.location.href = "/login"; // Rediriger vers la page de connexion
//       }
//     }
//     return Promise.reject(error);
//   }
// );
