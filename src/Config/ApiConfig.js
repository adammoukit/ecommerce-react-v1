import axios from "axios";

// const isProduction = import.meta.env.MODE === "production";

// const BASE_URL = isProduction
//   ? import.meta.env.VITE_API_URL // Utilisez l'URL de production
//   : "http://localhost:5454"; // Utilisez localhost en développement
export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5454";

const jwt = localStorage.getItem("jwt");

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${jwt}`,
    "Content-Type": "application/json",
  },
});
