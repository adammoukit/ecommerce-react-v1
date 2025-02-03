import {
  GET_LEVEL_ONE_CATEGORIES_REQUEST,
  GET_LEVEL_ONE_CATEGORIES_SUCCESS,
  GET_SUBCATEGORIES_REQUEST,
  GET_SUBCATEGORIES_SUCCESS,
  GET_SUBCATEGORIES_FAILURE,
  GET_LEVEL_ONE_CATEGORIES_FAILLURE,
} from "./ActionType";

const initialState = {
  loading: false,
  categories: [], // Liste des catégories de niveau 1
  subcategories: {}, // Objet où chaque clé est l'ID du parent, et la valeur est une liste de sous-catégories
  error: null, // Gère les erreurs
};

const levelOneCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    // Chargement des catégories de niveau 1
    case GET_LEVEL_ONE_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_LEVEL_ONE_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case GET_LEVEL_ONE_CATEGORIES_FAILLURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Chargement des sous-catégories
    case GET_SUBCATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_SUBCATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        subcategories: {
          ...state.subcategories,
          [action.payload.parentId]: action.payload.subcategories, // Ajout ou mise à jour des sous-catégories pour un parent spécifique
        },
      };
    case GET_SUBCATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Par défaut, retourne l'état actuel
    default:
      return state;
  }
};

export default levelOneCategoriesReducer;
