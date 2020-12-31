import { call, put, takeLatest } from 'redux-saga/effects'
import {
    TIMEKEEP_REQUESTING,
    TIMEKEEP_SUCCESS,
    TIMEKEEP_ERROR,
} from '../actionTypes/timekeep.actiontypes'

import { getRequest } from '../utils/request'

const timekeepUrl = 'https://reqres.in/api/register'

function* getTimeKeepFlow() {
    try {
        const res = yield call(getRequest, timekeepUrl);
        var {data}=res;

        yield put({ type: TIMEKEEP_SUCCESS,data })
    } catch (error) {
        yield put({ type: TIMEKEEP_ERROR, error })
    }
}

export function* timekeepWatcher() {
    yield takeLatest(TIMEKEEP_REQUESTING, getTimeKeepFlow)
}

