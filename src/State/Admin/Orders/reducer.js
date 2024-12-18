import { DELETE_PRODUCT_FAILURE } from "../../Product/ActionType";
import {
  CANCELED_ORDER_FAILURE,
  CANCELED_ORDER_REQUEST,
  CANCELED_ORDER_SUCCESS,
  CONFIRM_ORDER_FAILURE,
  CONFIRM_ORDER_REQUEST,
  CONFIRM_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELIVERED_ORDER_REQUEST,
  DELIVERED_ORDER_SUCCESS,
  GET_ORDERS_FAILURE,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  PLACED_ORDER_FAILURE,
  PLACED_ORDER_REQUEST,
  PLACED_ORDER_SUCCESS,
  SHIP_ORDER_FAILURE,
  SHIP_ORDER_REQUEST,
  SHIP_ORDER_SUCCESS,
} from "./ActionType";

const initialState = {
  orders: [],
  loading: false,
  error: "",
};

const adminOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
      return { ...state, loading: true };
    case DELETE_ORDER_REQUEST:
      return { ...state, loading: true };
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: true,
        orders: state.orders.filter((order) => order.id !== action.id),
      };
    case DELETE_ORDER_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case GET_ORDERS_SUCCESS:
      return { ...state, loading: false, orders: action.payload };
    case GET_ORDERS_FAILURE:
      return { orders: [], loading: false, error: action.payload };
    case SHIP_ORDER_REQUEST:
    case CONFIRM_ORDER_REQUEST:
    case PLACED_ORDER_REQUEST:
    case DELIVERED_ORDER_REQUEST:
    case CANCELED_ORDER_REQUEST:
      return { ...state, loading: true };
    case SHIP_ORDER_SUCCESS:
      return { ...state, loading: true, shipped: action.payload };
    case CONFIRM_ORDER_SUCCESS:
      return { ...state, loading: false, confirmed: action.payload };
    case PLACED_ORDER_SUCCESS:
      return { ...state, loading: false, placed: action.payload };
    case DELIVERED_ORDER_SUCCESS:
      return { ...state, loading: false, delivered: action.payload };
    case CANCELED_ORDER_SUCCESS:
      return { ...state, loading: false, canceled: action.payload };
    case CONFIRM_ORDER_FAILURE:
    case PLACED_ORDER_FAILURE:
    case CANCELED_ORDER_FAILURE:
    case SHIP_ORDER_FAILURE:
    case DELETE_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state; // IMPORTANT : Retourne l'état actuel si l'action n'est pas reconnue.
  }
};

export default adminOrderReducer;
