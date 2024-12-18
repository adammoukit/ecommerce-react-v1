import { api } from "../../Config/ApiConfig";
import { CREATE_ORDER_SUCCESS } from "../Order/ActionType";
import {
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCT_FAILURE,
  FIND_PRODUCT_REQUEST,
  FIND_PRODUCT_SUCCESS,
  GET_ALL_GLOBAL_PRODUCT_FAILURE,
  GET_ALL_GLOBAL_PRODUCT_REQUEST,
  GET_ALL_GLOBAL_PRODUCT_SUCCESS,
} from "./ActionType";

export const findProduct = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_REQUEST });
  const {
    colors,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    category,
    stock,
    sort,
    pageNumber,
    pageSize,
  } = reqData;

  try {
    const { data } = await api.get(
      `/api/products/all-product?category=${category}&color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&sort=${sort}&stock=${stock}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );

    dispatch({ type: FIND_PRODUCT_SUCCESS, payload: data });
    console.log("product data: ", data);
  } catch (error) {
    dispatch({ type: FIND_PRODUCT_FAILURE, payload: error.message });
  }
};

export const findProductById = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
  const { productId } = reqData;

  try {
    const { data } = await api.get(`/api/products/id/${productId}`);
    console.log("data ", data);

    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    const data = await api.post("/api/admin/products/create", product);
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
    console.log("product created:", data);
  } catch (error) {
    dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    const data = await api.delete(`/api/admin/products/${productId}/delete`);
    console.log("Delete response:", data); // Log
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: productId });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
  }
};

export const getAllGlobalProducts = (page = 0) => async (dispatch) => {
  dispatch({ type: GET_ALL_GLOBAL_PRODUCT_REQUEST });

  try {
    const { data } = await api.get(`/api/products/globals?page=${page}`); // Modifier l'URL selon votre backend
    dispatch({ type: GET_ALL_GLOBAL_PRODUCT_SUCCESS, payload: data });
    console.log("Global products: ", data);
  } catch (error) {
    dispatch({ type: GET_ALL_GLOBAL_PRODUCT_FAILURE, payload: error.message });
  }
};
