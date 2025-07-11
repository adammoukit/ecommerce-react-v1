import { api } from "@/Config/ApiConfig";
import {
  CREATE_PRODUCT_METADATA_FAILURE,
  CREATE_PRODUCT_METADATA_REQUEST,
  CREATE_PRODUCT_METADATA_SUCCESS,
  GET_PRODUCT_METADATA_FAILURE,
  GET_PRODUCT_METADATA_REQUEST,
  GET_PRODUCT_METADATA_SUCCESS,
} from "./ActionsType";

export const createProductMetadata = (reqData) => {
  return async (dispatch) => {
    try {
      // Dispatch de la requête
      dispatch({ type: CREATE_PRODUCT_METADATA_REQUEST });

      // Appel à l'API
      const response = await api.post(
        "/api/attributes-metadata/new-attribute",
        reqData
      );
      console.log("product metadata", response.data);

      // Dispatch en cas de succès
      dispatch({
        type: CREATE_PRODUCT_METADATA_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error creating product metadata", error);

      // Dispatch en cas d'erreur
      dispatch({
        type: CREATE_PRODUCT_METADATA_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const getProductMetadata = (categorieId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_PRODUCT_METADATA_REQUEST });

      // Appel à l'API pour récupérer les métadonnées des attributs
      const response = await api.get(
        `/api/attributes-metadata/by-category?categoryId=${categorieId}`
      );
      // Transformation en cas d'erreur serveur non résolue
    //   const safeData = Array.isArray(response.data) ? response.data : [];
    //   const simplifiedMetadata = safeData.map((item) => ({
    //     id: item.id,
    //     name: item.name,
    //     dataType: item.dataType,
    //     isRequired: item.required || item.isRequired || false,
    //   }));

    console.log("product metadata :", response.data);

      dispatch({
        type: GET_PRODUCT_METADATA_SUCCESS,
        payload: response.data,
      });

      

      dispatch({
        type: GET_PRODUCT_METADATA_SUCCESS,
        payload: simplifiedMetadata,
      });
    } catch (error) {
      dispatch({ type: GET_PRODUCT_METADATA_FAILURE, payload: error.message });
    }
  };
};
