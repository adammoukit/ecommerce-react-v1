import {
  GET_CATEGORY_HIERARCHY_REQUEST,
  GET_CATEGORY_HIERARCHY_SUCCESS,
  GET_CATEGORY_HIERARCHY_FAILURE,
  GET_CATEGORY_ID_BY_PRODUCT_ID_REQUEST,
  GET_CATEGORY_ID_BY_PRODUCT_ID_SUCCESS,
  GET_CATEGORY_ID_BY_PRODUCT_ID_FAILURE,
} from "./ActionType";

const initialState = {
  hierarchy: "", // Contient la hiérarchie formatée
  loading: false,
  error: "",
  categoryId: null, // Contient l'ID de la catégorie
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY_HIERARCHY_REQUEST:
    case GET_CATEGORY_ID_BY_PRODUCT_ID_REQUEST:
      return { ...state, loading: true, error: "" };
    case GET_CATEGORY_ID_BY_PRODUCT_ID_SUCCESS:
      return { ...state, loading: false, categoryId: action.payload };
    case GET_CATEGORY_HIERARCHY_SUCCESS:
      return { ...state, loading: false, hierarchy: action.payload };

    case GET_CATEGORY_ID_BY_PRODUCT_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_CATEGORY_HIERARCHY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state; // Retourne l'état actuel si l'action n'est pas reconnue
  }
};

export default categoryReducer;
