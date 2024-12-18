import { api } from "../../../Config/ApiConfig";
import {
  CONFIRM_ORDER_FAILURE,
  CONFIRM_ORDER_REQUEST,
  CONFIRM_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELIVERED_ORDER_FAILURE,
  DELIVERED_ORDER_REQUEST,
  DELIVERED_ORDER_SUCCESS,
  GET_ORDERS_FAILURE,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  PLACED_ORDER_FAILURE,
  SHIP_ORDER_FAILURE,
  SHIP_ORDER_REQUEST,
  SHIP_ORDER_SUCCESS,
} from "./ActionType";

export const getOrders = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ORDERS_REQUEST });
    try {
      const response = await api.get("/api/admin/orders/all-orders");
      console.log("get alls orders :", response.data);
      dispatch({ type: GET_ORDERS_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("catch error :", error);
      dispatch({ type: GET_ORDERS_FAILURE, payload: error.message });
    }
  };
};

export const confirmOrder = (orderId) => async (dispatch) => {
  dispatch({ type: CONFIRM_ORDER_REQUEST });
  try {
    const response = await api.put(`/api/admin/orders/${orderId}/confirmed`);
    console.log("order confirmed :", response.data);
    dispatch({ type: CONFIRM_ORDER_SUCCESS, payload: response.data });
  } catch (error) {
    console.log("catch error :", error);
    dispatch({ type: CONFIRM_ORDER_FAILURE, payload: error.message });
  }
};

export const shipOrder = (orderId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SHIP_ORDER_REQUEST });
      const response = await api.put(`/api/admin/orders/${orderId}/ship`);
      console.log("ship order :", response.data);
      dispatch({ type: SHIP_ORDER_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("catch error :", error);
      dispatch({ type: SHIP_ORDER_FAILURE, payload: error.message });
    }
  };
};

export const deliveredOrder = (orderId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DELIVERED_ORDER_REQUEST });
      const response = await api.put(`/api/admin/orders/${orderId}/deliver`);
      console.log("delivered order :", response.data);
      dispatch({ type: DELIVERED_ORDER_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("catch error :", error);
      dispatch({ type: DELIVERED_ORDER_FAILURE, payload: error.message });
    }
  };
};

export const deleteOrder = (orderId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DELETE_ORDER_REQUEST });
      const response = await api.delete(`/api/admin/orders/${orderId}/delete`);
      console.log("deleted order :", response.data);
      dispatch({ type: DELETE_ORDER_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("catch error :", error);
      dispatch({ type: DELETE_ORDER_FAILURE, payload: error.message });
    }
  };
};


