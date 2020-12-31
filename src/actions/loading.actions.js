import {
  HIDE_SPINNER,
  SET_LOADING,
  SHOW_SPINNER,
} from "../actionTypes/app.actiontypes";

export const setLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});

export const showSpinner = (payload) => ({
  type: SHOW_SPINNER,
  payload,
});

export const hideSpinner = (payload) => ({
  type: HIDE_SPINNER,
  payload,
});
