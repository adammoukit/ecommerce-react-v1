import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GOOGLE_AUTH_FAILURE,
  GOOGLE_AUTH_REQUEST,
  GOOGLE_AUTH_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  loginResponse: null,
  googleAuthLoading: false,
  isLogedOut: false,
  isLoggedIn: false,
  logoutMessage: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
      return { ...state, isLoading: true, error: null };
    case GOOGLE_AUTH_REQUEST:
      return { ...state, googleAuthLoading: true, error: null };
    case GOOGLE_AUTH_SUCCESS:
      return {
        ...state,
        googleAuthLoading: false,
        user: action.payload.user,
        loginResponse: action.payload.message,
        isLoggedIn: true,
        error: null,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        loginResponse: action.payload,
        isLoggedIn: true,
      };
    case GET_USER_SUCCESS:
      return { ...state, isLoading: false, error: null, user: action.payload };
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case GOOGLE_AUTH_FAILURE:
      return { ...state, googleAuthLoading: false, error: action.payload };
    case LOGOUT_SUCCESS:
      return {
        ...initialState,
        user: null,
        loginResponse: null,
        isLogedOut: true,
        isLoggedIn: false,
        loginResponse: null,
        logoutMessage: action.payload,
      };
    default:
      return state;
  }
};
