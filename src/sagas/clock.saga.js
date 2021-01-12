import { call, put, takeLatest } from "redux-saga/effects";
import {
  CLOCK_REQUESTING,
  CLOCK_SUCCESS,
  CLOCK_ERROR,
} from "../actionTypes/clock.actiontypes";

import { USER_IN, USER_OUT } from "../actionTypes/user.actiontypes";

import * as actions from "actions";
import * as types from "actionTypes";
import configs from "configs/server.config";
import { getRequest, postRequest } from "utils/request";
import { navigate, goBack } from "utils/navigate";

function* clockFlow(action) {
  const { payload } = action;
  try {
    const res = yield call(
      postRequest,
      `${configs.apiUrl}empclock/clock`,
      payload
    );
    if (res.data.status == 1) {
      yield put(actions.clockSuccess(res.data));
      yield put({ type: USER_IN });
    } else if (res.data.status == 0) {
      yield put(actions.clockSuccess(res.data));
      yield put({ type: USER_OUT });
    }

    yield put({ type: "TIMEKEEP_REQUESTING" });
  } catch (error) {
    console.log(error);
    yield put({ type: CLOCK_ERROR, error });
  }
}

export function* clockWatcher() {
  yield takeLatest(CLOCK_REQUESTING, clockFlow);
}
