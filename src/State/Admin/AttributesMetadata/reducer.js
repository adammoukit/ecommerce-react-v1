import { CREATE_PRODUCT_METADATA_FAILURE, CREATE_PRODUCT_METADATA_REQUEST, CREATE_PRODUCT_METADATA_SUCCESS, GET_PRODUCT_METADATA_FAILURE, GET_PRODUCT_METADATA_REQUEST, GET_PRODUCT_METADATA_SUCCESS } from "./ActionsType";

const initialState = {
    metadata: null,         // Détails des métadonnées créées
    metadataList: [],       // Liste des métadonnées récupérées
    loading: false,
    error: null,
  };
  
  export const productMetadataReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_PRODUCT_METADATA_REQUEST:
      case GET_PRODUCT_METADATA_REQUEST:
        return { 
          ...state, 
          loading: true, 
          error: null 
        };
  
      case CREATE_PRODUCT_METADATA_SUCCESS:
        return {
          ...state,
          loading: false,
          metadata: action.payload,   // Stocke les métadonnées créées
          error: null,
        };
  
      case GET_PRODUCT_METADATA_SUCCESS:
        return {
          ...state,
          loading: false,
          metadataList: action.payload,  // Stocke la liste des métadonnées
          error: null,
        };
  
      case CREATE_PRODUCT_METADATA_FAILURE:
      case GET_PRODUCT_METADATA_FAILURE:
        return { 
          ...state, 
          loading: false, 
          error: action.payload 
        };
  
      default:
        return state;
    }
  };