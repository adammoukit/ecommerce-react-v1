import { api } from "../../Config/ApiConfig";
import {
  GET_LEVEL_ONE_CATEGORIES_FAILLURE,
  GET_LEVEL_ONE_CATEGORIES_REQUEST,
  GET_LEVEL_ONE_CATEGORIES_SUCCESS,
  GET_SUBCATEGORIES_FAILURE,
  GET_SUBCATEGORIES_REQUEST,
  GET_SUBCATEGORIES_SUCCESS,
} from "./ActionType";

export const getLevelOneCategories = () => async (dispatch) => {
  dispatch({ type: GET_LEVEL_ONE_CATEGORIES_REQUEST });
  try {
    const response = await api.get("api/admin/categories/top-level");
    dispatch({
      type: GET_LEVEL_ONE_CATEGORIES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_LEVEL_ONE_CATEGORIES_FAILLURE,
      payload: error.message,
    });
  }
};



// Action pour récupérer les sous-catégories d'une catégorie parent
export const getSubcategories = (parentId) => async (dispatch) => {
    dispatch({ type: GET_SUBCATEGORIES_REQUEST });
    try {
      const response = await api.get(`/api/admin/categories/${parentId}/subcategories`);
      dispatch({
        type: GET_SUBCATEGORIES_SUCCESS,
        payload: {
          parentId, // Identifiant de la catégorie parent
          subcategories: response.data, // Sous-catégories associées
        },
      });
    } catch (error) {
      dispatch({
        type: GET_SUBCATEGORIES_FAILURE,
        payload: error.message,
      });
    }
  };
