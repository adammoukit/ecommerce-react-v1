import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_HISTORY_FAILURE,
  GET_ORDER_HISTORY_REQUEST,
  GET_ORDER_HISTORY_SUCCESS,
} from "./ActionType";

const initialState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { loading: true };

    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: [...state.orders, action.payload], // Ajoute la nouvelle commande au tableau 'orders'
        order: action.payload, // Met à jour l'objet 'order'
        error: null,
      };
    case CREATE_ORDER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case GET_ORDER_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_ORDER_BY_ID_SUCCESS:
      return { ...state, loading: false, order: action.payload, error: null };
    case GET_ORDER_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    // Gestion de l'historique des commandes
    case GET_ORDER_HISTORY_REQUEST:
      return { ...state, loading: true, error: null }; // Démarre le chargement pour l'historique

    case GET_ORDER_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload, // Met à jour la liste complète des commandes avec l'historique
        error: null,
      };

    case GET_ORDER_HISTORY_FAILURE:
      return { ...state, loading: false, error: action.payload }; // En cas d'échec, met à jour l'erreur

    default:
      return state;
  }
};
