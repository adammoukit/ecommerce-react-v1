import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5454";

const jwt = localStorage.getItem("jwt");

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${jwt}`,
    "Content-Type": "application/json",
  },
});
