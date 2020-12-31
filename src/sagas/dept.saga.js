import { take, fork, call, put } from "redux-saga/effects";

// Our DEPT actiontypes
import * as COMPANY from "../actionTypes/company.actiontypes";
import * as URL from "./url.constant";

// So that we can modify our User piece of state

//utils
import * as actions from "actions";
import * as types from "actionTypes";
import configs from "configs/server.config";
import { getRequest, postRequest } from "utils/request";
import { navigate, goBack } from "utils/navigate";

function* postFlow(newdata, url) {
  try {
    const res = yield call(postRequest, url, newdata);
    yield put({ type: COMPANY.DEPT_REQUESTING });
  } catch (error) {
    yield put({ type: COMPANY.DEPT_ERROR, error });
  }
  // return the token
  return true;
}

function* getFlow(url, id) {
  try {
    const res = yield call(getRequest, `${configs.apiUrl}dep/list`);
    var { data } = res;
    console.log("Branchs reponse");
    console.log(data);
    yield put({ type: COMPANY.DEPT_SUCCESS, data });
  } catch (error) {
    yield put({ type: COMPANY.DEPT_ERROR, error });
  }

  return true;
}

export function* getDeptWatchcer() {
  while (true) {
    console.log("Watching GET on DEPT");

    const action = yield take([COMPANY.DEPT_REQUESTING, COMPANY.DEPT_DEL]);

    console.log("Watched  GET on DEPT");

    yield fork(getFlow, URL[action.type], action.id);
  }
}

export function* postDeptWatchcer() {
  while (true) {
    console.log("Watching POST on DEPT");

    const action = yield take([COMPANY.DEPT_ADD, COMPANY.DEPT_EDIT]);

    console.log("Watched  POST on DEPT");

    yield fork(postFlow, action.newdata, URL[action.type]);
  }
}
