import axios from "axios";
import { api, BASE_URL } from "../../Config/ApiConfig";
import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";
import { getCart } from "../Cart/Action";
import { getUserOrderCount } from "../Order/Action";
import { use } from "react";
import { toast } from "react-toastify";

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

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

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
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
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

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT, payload: null });
  localStorage.clear(); // Supprimer les données locales
  window.location.href = "/login"; // Rediriger vers la page de connexion
};
