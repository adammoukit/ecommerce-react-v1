import {
  CLEAR_PRODUCT_TYPE_SUGGESTIONS,
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  FILTER_PRODUCTS_FAILURE,
  FILTER_PRODUCTS_REQUEST,
  FILTER_PRODUCTS_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCT_FAILURE,
  FIND_PRODUCT_REQUEST,
  FIND_PRODUCT_SUCCESS,
  GET_ALL_GLOBAL_PRODUCT_FAILURE,
  GET_ALL_GLOBAL_PRODUCT_REQUEST,
  GET_ALL_GLOBAL_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_TYPE_SUGGESTIONS_FAILURE,
  SEARCH_PRODUCT_TYPE_SUGGESTIONS_REQUEST,
  SEARCH_PRODUCT_TYPE_SUGGESTIONS_SUCCESS,
} from "./ActionType";

const initialState = {
  products: [],
  product: {},
  loading: false,
  deleteSuccess: false, // Indicateur de succès
  error: null,
  globalProducts: [], // Nouveau champ pour stocker les produits globaux
  filteredProducts: [], // Champ pour stocker les produits filtrés
  productTypeSuggestions: {
    loading: false,
    error: null,
    data: [], // Contiendra les suggestions {productType, hierarchy}
  },
};

export const customerProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_PRODUCT_REQUEST:
    case FIND_PRODUCT_BY_ID_REQUEST:
      return { ...state, loading: true, error: false };
    case DELETE_PRODUCT_REQUEST:
      return { ...state, loading: true, error: false, deleteSuccess: false };
    case CREATE_PRODUCT_REQUEST:
      return { ...state, loading: true, error: false };
    case GET_ALL_GLOBAL_PRODUCT_REQUEST:
    case FILTER_PRODUCTS_REQUEST: // Ajout
      return { ...state, loading: true, error: false };
    case FIND_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        deleteSuccess: false,
        products: action.payload,
      };
    case GET_ALL_GLOBAL_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        globalProducts: action.payload, // Met à jour les produits globaux
      };
    case GET_ALL_GLOBAL_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FIND_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        product: action.payload,
        deleteSuccess: false,
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        deleteSuccess: true, // Indique que la suppression a réussi
        products: {
          ...state.products,
          content: state.products.content.filter(
            (product) => product.id !== action.payload
          ),
        }, // Retire le produit supprimé,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: {
          ...state.products,
          content: [action.payload, ...state.products.content], // Ajoute le produit au début de `content`
        },
      };

    case FILTER_PRODUCTS_SUCCESS: // Gestion du succès de filtre
      return {
        ...state,
        loading: false,
        error: null,
        filteredProducts: action.payload,
      };
    case "CLEAR_FILTER_PRODUCTS":
      return {
        ...state,
        filteredProducts: [], // Réinitialisation des produits filtrés
        loading: false,
      };
    case FIND_PRODUCT_FAILURE:
    case FIND_PRODUCT_BY_ID_FAILURE:
    case CREATE_PRODUCT_FAILURE:
    case DELETE_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FILTER_PRODUCTS_FAILURE: // Gestion des erreurs de filtre
      return { ...state, loading: false, error: action.payload };

    case SEARCH_PRODUCT_TYPE_SUGGESTIONS_REQUEST:
      return {
        ...state,
        productTypeSuggestions: {
          ...state.productTypeSuggestions,
          loading: true,
          error: null,
        },
      };
    case SEARCH_PRODUCT_TYPE_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        productTypeSuggestions: {
          loading: false,
          error: null,
          data: action.payload,
        },
      };

    case SEARCH_PRODUCT_TYPE_SUGGESTIONS_FAILURE:
      return {
        ...state,
        productTypeSuggestions: {
          ...state.productTypeSuggestions,
          loading: false,
          error: action.payload,
          data: [],
        },
      };

    case CLEAR_PRODUCT_TYPE_SUGGESTIONS:
      return {
        ...state,
        productTypeSuggestions: {
          ...state.productTypeSuggestions,
          data: [],
        },
      };
    default:
      return state;
  }
};
