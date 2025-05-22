import axios from "axios";
import { api, BASE_URL } from "../../Config/ApiConfig";
import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GOOGLE_AUTH_FAILURE,
  GOOGLE_AUTH_REQUEST,
  GOOGLE_AUTH_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";
import { getCart } from "../Cart/Action";
import { getUserOrderCount } from "../Order/Action";


export const register = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const user = response.data;
    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }
    console.log("user :", user);
    dispatch({ type: REGISTER_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.message });
  }
};

export const login = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    // console.log("Sending request to:", api.defaults.baseURL + "/auth/signup");

    const response = await axios.post(`${BASE_URL}/auth/signin`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const Response = response.data;
    if (Response.jwt) {
      localStorage.setItem("jwt", Response.jwt);
    }
    console.log("login response :", Response);
    dispatch({ type: LOGIN_SUCCESS, payload: Response });

    // Récupérer les données du panier et les commandes après connexion
    dispatch(getCart());
    dispatch(getUserOrderCount());
  } catch (error) {
    console.log("Login error:", error);
    dispatch({ type: LOGIN_FAILURE, payload: error.response.data.message });
  }
};

const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = (jwt) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });

  try {
    const response = await api.get(`/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const user = response.data;
    console.log("get user :", user);

    dispatch({ type: GET_USER_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: GET_USER_FAILURE, payload: error.message });
  }
};

// Action Creator
export const googleAuth = (token) => async (dispatch) => {
  dispatch({ type: GOOGLE_AUTH_REQUEST });

  try {
    const response = await api.post(`${BASE_URL}/login/oauth/google`, {
      token,
    });
    const { jwt, message, user, requiresLinking } = response.data;

    if (jwt && !requiresLinking) {
      localStorage.setItem("jwt", jwt);
      dispatch(getUser(jwt));
      dispatch(getCart());
    }

    dispatch({
      type: GOOGLE_AUTH_SUCCESS,
      payload: {
        user,
        message,
        requiresLinking: response.data.requiresLinking || false,
        ...(requiresLinking && {
          email: response.data.email,
          existingProvider: response.data.existingProvider,
        }),
      },
    });
  } catch (error) {
    dispatch({
      type: GOOGLE_AUTH_FAILURE,
      payload: error.response?.data?.message || "Erreur Google",
    });
    throw error; // Important pour la gestion d'erreur dans le composant
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  try {
    const response = await api.get(`${BASE_URL}/auth/logout`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { message } = response.data;
    console.log("Logout response depuis l'api :", message);

    dispatch({ type: LOGOUT_SUCCESS, payload: message });

    localStorage.clear(); // Supprimer les données locales
  } catch (error) {
    dispatch({ type: LOGOUT_FAILURE, payload: error.message });
  }

  // window.location.href = "/"; // Rediriger vers la page de connexion
};
