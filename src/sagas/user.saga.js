import { take, fork, cancel, call, put, takeLatest } from "redux-saga/effects";
// Our login actiontypes
import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
} from "../actionTypes/login.actiontypes";

import configs from "configs/server.config";

// So that we can modify our User piece of state
import { setUSER, unsetUSER } from "../actions/user.action";
import * as actions from "../actions";
import * as types from "../actionTypes";

//Utils
import { setToken, unsetToken } from "../utils/token";
import { getRequest, postRequest } from "../utils/request";
import { USER_UNSET } from "../actionTypes/user.actiontypes";
import { navigate } from "../utils/navigate";

function* logout() {
  // dispatches the User_UNSET action
  console.log("LOG OUT");
  yield put(unsetUSER());
  navigate("Login");
}

function* onLoginSucess() {
  console.log("Watched onLoginSucess");
  try {
    const res = yield call(getRequest, `${configs.apiUrl}user`);

    yield put(setUSER(res.data));

    navigate("Home");
  } catch (error) {
    console.log(error);
  }
}

function* loginFlow(name, phone_number) {
  try {
    const res = yield call(postRequest, `${configs.apiUrl}auth/login`, {
      name,
      phone_number,
    });
    const { data } = res;

    yield console.log(`Token:${token}`);

    setToken(data.token);

    yield put(setUSER(res.data));

    yield put(actions.onLoginSucess());
  } catch (error) {
    console.log(error);

    yield put({ type: LOGIN_ERROR, error });
  }

  // return the token
  return token;
}

function* signupFlow(action) {
  try {
    const { name, phone_number } = action;

    const res = yield call(postRequest, `${configs.apiUrl}shop/register`, {
      name,
      phone_number,
    });
    const { data } = res;
    setToken(data.token);
    yield put(setUSER(res.data));
    yield put(actions.onLoginSucess());
  } catch (error) {
    console.log(error);
    yield put({ type: types.SIGNUP_ERROR, error });
  }
}

export function* signupWatcher() {
  yield takeLatest(types.SIGNUP_REQUESTING, signupFlow);
}

export function* loginWatchcer() {
  const { name, phone_number } = yield take(LOGIN_REQUESTING);
  console.log({ name, phone_number });
  yield call(loginFlow, name, phone_number);
}

export function* onloginSucessWatchcer() {
  console.log("Watching onLoginSucess");
  yield takeLatest(LOGIN_SUCCESS, onLoginSucess);
}

export function* logoutWatcher() {
  yield takeLatest(LOGOUT, logout);
}
