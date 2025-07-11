import { api } from "@/Config/ApiConfig";
import {
    CREATE_PRODUCT_TYPE_FAILURE,
  CREATE_PRODUCT_TYPE_REQUEST,
  CREATE_PRODUCT_TYPE_SUCCESS,
} from "./ActionType";

export const createProductType = (reqData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: CREATE_PRODUCT_TYPE_REQUEST });

      // Appel à l'API pour créer le type de produit
      const response = await api.post(
        "/api/product-types/new-productType",
        reqData
      );

      console.log("Product type created:", response.data);

      dispatch({ type: CREATE_PRODUCT_TYPE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({type:CREATE_PRODUCT_TYPE_FAILURE, payload:error.message,})
    }
  };
};
