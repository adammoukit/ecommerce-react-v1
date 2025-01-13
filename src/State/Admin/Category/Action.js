import {
  GET_CATEGORY_HIERARCHY_REQUEST,
  GET_CATEGORY_HIERARCHY_SUCCESS,
  GET_CATEGORY_HIERARCHY_FAILURE,
  GET_CATEGORY_ID_BY_PRODUCT_ID_REQUEST,
  GET_CATEGORY_ID_BY_PRODUCT_ID_SUCCESS,
  GET_CATEGORY_ID_BY_PRODUCT_ID_FAILURE,
} from "./ActionType";
import { api } from "../../../Config/ApiConfig";

export const getCategoryHierarchy = (categoryId) => {
  return async (dispatch) => {
    try {
      // Dispatch de la requête
      dispatch({ type: GET_CATEGORY_HIERARCHY_REQUEST });

      // Appel à l'API
      const response = await api.get(
        `/api/admin/categories/${categoryId}/hierarchy`
      );
      console.log("Category hierarchy:", response.data);

      // Dispatch en cas de succès
      dispatch({
        type: GET_CATEGORY_HIERARCHY_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching category hierarchy:", error);

      // Dispatch en cas d'erreur
      dispatch({
        type: GET_CATEGORY_HIERARCHY_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const getCategoryIdByProductId = (productId) => {
    return async (dispatch) => {
      try {
        // Dispatch de la requête
        dispatch({ type: GET_CATEGORY_ID_BY_PRODUCT_ID_REQUEST });
  
        // Appel à l'API
        const response = await api.get(`/api/products/${productId}/categoryId`);
        console.log("Category ID for Product:", response.data);
  
        // Dispatch en cas de succès
        dispatch({
          type: GET_CATEGORY_ID_BY_PRODUCT_ID_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        console.error("Error fetching category ID:", error);
  
        // Dispatch en cas d'erreur
        dispatch({
          type: GET_CATEGORY_ID_BY_PRODUCT_ID_FAILURE,
          payload: error.message,
        });
      }
    };
  };
