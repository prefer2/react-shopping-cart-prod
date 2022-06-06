import appClient from "@/utils/appClient";
import { setCookie, deleteCookie } from "@/utils/auth";

import { toggleSnackbarOpen } from "@/redux/modules/snackbar";

import { MESSAGE, ERROR_CODE } from "@/constants";

const ACTION_TYPES = {
  GET_USER_SUCCESS: "GET_USER_SUCCESS",
  GET_USER_FAILURE: "GET_USER_FAILURE",

  LOGOUT_USER: "LOGOUT_USER",

  EDIT_USER_SUCCESS: "EDIT_USER_SUCCESS",
  EDIT_USER_FAILURE: "EDIT_USER_FAILURE",
};

const initialState = {
  email: "",
  nickname: "",
  authorized: false,
};

export const getUser = (email, password) => async (dispatch) => {
  try {
    const { data } = await appClient.post("/login", { email, password });
    dispatch({ type: ACTION_TYPES.GET_USER_SUCCESS, payload: data });
  } catch (error) {
    const { errorCode } = error.response.data;
    dispatch(toggleSnackbarOpen(MESSAGE[ERROR_CODE[errorCode]]));
    dispatch({
      type: ACTION_TYPES.GET_USER_FAILURE,
      payload: errorCode,
    });
  }
};

export const logoutUser = () => ({ type: ACTION_TYPES.LOGOUT_USER });

export const editUser = () => async () => {
  try {
    await appClient.put("/users/me");
    dispatch({ type: ACTION_TYPES.EDIT_USER_SUCCESS });
  } catch (error) {
    const { errorCode } = error.response.data;
    dispatch(toggleSnackbarOpen(MESSAGE[ERROR_CODE[errorCode]]));
    dispatch({
      type: ACTION_TYPES.EDIT_USER_FAILURE,
      payload: errorCode,
    });
  }
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.GET_USER_SUCCESS: {
      const { email, nickname, accessToken } = action.payload;
      setCookie("accessToken", accessToken);
      return {
        email,
        nickname,
        authorized: true,
      };
    }
    case ACTION_TYPES.GET_USER_FAILURE: {
      return {
        ...state,
        authorized: false,
      };
    }
    case ACTION_TYPES.LOGOUT_USER: {
      deleteCookie("accessToken");
      return {
        ...state,
        authorized: false,
      };
    }
    case ACTION_TYPES.REGISTER_USER_SUCCESS: {
      const { email, nickname } = action.payload;
      return { email, nickname, authorized: false };
    }
    case ACTION_TYPES.REGISTER_USER_FAILURE: {
      return {
        ...state,
        authorized: false,
      };
    }
    default: {
      return state;
    }
  }
}
