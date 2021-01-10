import { call, put, takeLatest } from "redux-saga/effects";
import {
  CALENDAR_REQUESTING,
  CALENDAR_SUCCESS,
  CALENDAR_ERROR,
} from "../actionTypes/calendar.actiontypes";

import { transformSection } from "../utils";

import * as actions from "actions";
import * as types from "actionTypes";
import configs from "configs/server.config";
import { getRequest, postRequest } from "utils/request";
import { navigate, goBack } from "utils/navigate";

const calendarUrl = `${configs.apiUrl}empshift/listbyuser`;

function* getCalendarFlow() {
  try {
    const res = yield call(getRequest, calendarUrl);
    var { data } = res;
    console.log("CALENDAR DATA");
    console.log(data);
    let transdata = transformSection(data);
    console.log(transdata);
    yield put({ type: CALENDAR_SUCCESS, data: transdata });
  } catch (error) {
    yield put({ type: CALENDAR_ERROR, error });
  }
}

export function* calendarWatcher() {
  console.log("CALENDAR WATCHING");
  yield takeLatest(CALENDAR_REQUESTING, getCalendarFlow);
}
