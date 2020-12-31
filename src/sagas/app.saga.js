import { put, takeEvery } from "redux-saga/effects";
import { NavigationActions } from "react-navigation";

import { INITIALIZE_APP } from "../actionTypes/app.actiontypes";
import { select } from "redux-saga/effects";
import { setToken } from "../utils/token";
import { getUserToken } from "../selectors/index";
import { onLoginSucess } from "../actions";
import { navigate } from "../utils/navigate";

function* initializeApp() {
  console.log("initializeApp saga");
  let token = yield select(getUserToken);
  if (token) {
    console.log(token);
    setToken(token);
    yield put(onLoginSucess());
  } else {
    navigate("Login");
  }
}

export function* watchAppInitial() {
  yield takeEvery(INITIALIZE_APP, initializeApp);
}
