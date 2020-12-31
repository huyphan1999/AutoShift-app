import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../actionTypes/login.actiontypes";

export const loginRequest = function loginRequest({ name, phone_number }) {
  return {
    type: LOGIN_REQUESTING,
    name,
    phone_number,
  };
};

export const onLoginSucess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const logout = (payload) => ({
  type: LOGOUT,
  payload,
});
