import { call, put, takeLatest } from 'redux-saga/effects'
import {
    IN_REQUESTING,
    IN_SUCCESS,
    IN_ERROR,
} from '../actionTypes/in.actiontypes'

import { USER_IN,USER_OUT} from '../actionTypes/user.actiontypes';

import { getRequest } from '../utils/request'

const inOutUrl = 'https://reqres.in/api/regist'

function* inFlow() {
    try {

        const res=yield call(getRequest, inOutUrl);
        if (res.data.status==1) {
            yield put({ type: IN_SUCCESS })
            yield put({type:USER_IN})
        }
        else
        {
            yield put({ type: IN_SUCCESS })
            yield put({type:USER_OUT})
        }
       
        
    } catch (error) {
        console.log(error)
        yield put({ type: IN_ERROR, error })
       
    }
}


export function* inWatcher() {
    yield takeLatest(IN_REQUESTING, inFlow)
}

