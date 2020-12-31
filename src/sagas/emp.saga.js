import { take, fork, call, put } from "redux-saga/effects";

// Our EMP actiontypes
import * as EMP from "../actionTypes/emp.actiontypes";
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
    yield put({ type: EMP.EMP_REQUESTING });
  } catch (error) {
    yield put({ type: EMP.EMP_ERROR, error });
  }
  // return the token
  return true;
}

function* getFlow(url, id) {
  try {
    const res = yield call(getRequest, `${configs.apiUrl}user/list`);

    var { data } = res;
    console.log(data);
    yield put({ type: EMP.EMP_SUCCESS, data });
  } catch (error) {
    console.log(error);
    yield put({ type: EMP.EMP_ERROR, error });
  }

  return true;
}

function* getInforFlow(url, id) {
  console.log("GET INFOR");
  try {
    const res = yield call(getRequest, url, id);
    var { data } = res;
    yield put({ type: EMP.EMP_INFOR_SUCESS, data });
  } catch (error) {
    yield put({ type: EMP.EMP_ERROR, error });
  }

  return true;
}

export function* getEmpWatchcer() {
  try {
    const action = yield take([EMP.EMP_REQUESTING, EMP.EMP_DEL, EMP.EMP_INFOR]);

    if (action.type == EMP.EMP_INFOR) {
      yield fork(getInforFlow, URL[action.type], action.id);
    } else {
      yield fork(getFlow, URL[action.type], action.id);
    }
    console.log("Watched  GET on EMP");
  } catch (error) {
    console.log(error);
  }
}

export function* postEmpWatchcer() {
  while (true) {
    console.log("Watching POST on EMP");

    const action = yield take([EMP.EMP_ADD, EMP.EMP_EDIT]);

    console.log("Watched  POST on EMP");
    console.log(action);
    yield fork(postFlow, action.newdata, URL[action.type]);
  }
}
