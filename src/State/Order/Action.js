import { api } from "../../Config/ApiConfig";
import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_USER_ORDER_COUNT_FAILURE,
  GET_USER_ORDER_COUNT_REQUEST,
  GET_USER_ORDER_COUNT_SUCCESS,
} from "./ActionType";

export const createOrder = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  try {
    const { data } = await api.post("api/orders/new-order", reqData.address);
    // if (data.id) {
    //   reqData.navigate({ search: `step=3&order_id=${data.id}` });
    // }
    if (data.payment_url) {
      // reqData.navigate({ search: `step=3&order_id=${data.id}` });
      window.location.href = data.payment_url;
    }
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });
  }
};

export const getOrderById = (orderId) => async (dispatch) => {
  dispatch({ type: GET_ORDER_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`/api/orders/${orderId}`);

    dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data });
    console.log("get order by id:", data);
  } catch (error) {
    dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: error.message });
  }
};

// Action pour créer une commande et rediriger vers le paiement PayGate
export const createPayGatePayment = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  try {
    const { data } = await api.post("api/orders/initiate", reqData.address);

    if (data.payment_url) {
      // Redirige vers la page de paiement PayGate
      window.location.href = data.payment_url;
    }

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });
  }
};

export const getUserOrderCount = () => async (dispatch) => {
  dispatch({ type: GET_USER_ORDER_COUNT_REQUEST });
  try {
    const response = await api.get("api/orders/count");
    dispatch({ type: GET_USER_ORDER_COUNT_SUCCESS, payload: response.data });
    console.log("orderCount: ", response.data);
  } catch (error) {
    dispatch({ type: GET_USER_ORDER_COUNT_FAILURE, payload: error.message });
  }
};
