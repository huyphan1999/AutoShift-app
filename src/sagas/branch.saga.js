import { take, fork, call, put } from "redux-saga/effects";

// Our BRANCH actiontypes
import * as COMPANY from "../actionTypes/company.actiontypes";
import * as URL from "./url.constant";

// So that we can modify our User piece of state

//Utils
import * as actions from "actions";
import * as types from "actionTypes";
import configs from "configs/server.config";
import { getRequest, postRequest } from "utils/request";
import { navigate, goBack } from "utils/navigate";

function* postFlow(newdata, url) {
  try {
    const res = yield call(postRequest, url, newdata);
    yield put({ type: COMPANY.BRANCH_REQUESTING });
  } catch (error) {
    yield put({ type: COMPANY.BRANCH_ERROR, error });
  }
  // return the token
  return true;
}

function* getFlow() {
  try {
    const res = yield call(getRequest, `${configs.apiUrl}branch/list`);

    var { data } = res;
    console.log("Branchs reponse");
    console.log(data);
    yield put({ type: COMPANY.BRANCH_SUCCESS, data });
  } catch (error) {
    yield put({ type: COMPANY.BRANCH_ERROR, error });
  }

  return true;
}

export function* getBranchWatchcer() {
  while (true) {
    console.log("Watching GET on BRANCH");

    const action = yield take([COMPANY.BRANCH_REQUESTING, COMPANY.BRANCH_DEL]);

    console.log("Watched  GET on BRANCH");

    yield fork(getFlow, URL[action.type], action.id);
  }
}

export function* postBranchWatchcer() {
  while (true) {
    console.log("Watching POST on BRANCH");

    const action = yield take([COMPANY.BRANCH_ADD, COMPANY.BRANCH_EDIT]);

    console.log("Watched  POST on BRANCH");

    yield fork(postFlow, action.newdata, URL[action.type]);
  }
}
