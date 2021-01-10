import { call, put, takeLatest } from "redux-saga/effects";
import {
  TIMEKEEP_REQUESTING,
  TIMEKEEP_SUCCESS,
  TIMEKEEP_ERROR,
} from "../actionTypes/timekeep.actiontypes";

import * as actions from "actions";
import * as types from "actionTypes";
import configs from "configs/server.config";
import { getRequest, postRequest } from "utils/request";
import { transformSection } from "../utils";
import { navigate, goBack } from "utils/navigate";

const timekeepUrl = `${configs.apiUrl}history/list`;

function* getTimeKeepFlow() {
  try {
    const res = yield call(getRequest, timekeepUrl);
    var { data } = res;

    let transdata = transformSection(data);

    console.log("history", transdata);

    yield put({ type: TIMEKEEP_SUCCESS, data: transdata });
  } catch (error) {
    console.log(error);
    yield put({ type: TIMEKEEP_ERROR, error });
  }
}

export function* timekeepWatcher() {
  yield takeLatest(TIMEKEEP_REQUESTING, getTimeKeepFlow);
}
