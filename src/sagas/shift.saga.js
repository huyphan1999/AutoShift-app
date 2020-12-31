import { take, fork, call, put } from 'redux-saga/effects'

// Our SHIFT actiontypes
import * as SHIFT from '../actionTypes/shift.actiontypes'
import * as URL from './url.constant';

// So that we can modify our User piece of state

//Utils
import { postRequest, getRequest } from '../utils/request'
import { navigate } from '../utils/navigate';


function* postFlow(newdata, url) {

    try {
        const res = yield call(postRequest, url, newdata);
        yield put({ type: SHIFT.SHIFT_REQUESTING })
    } catch (error) {
        yield put({ type: SHIFT.SHIFT_ERROR, error })
    }
    // return the token 
    return true
}


function* getFlow(url, id) {

    try {
        const res = yield call(getRequest, url, id);
        if (id) {
            yield put({ type: SHIFT.SHIFT_REQUESTING })

        } else {
            var { data } = res
            console.log('Shifts reponse')
            console.log(data)
            yield put({ type: SHIFT.SHIFT_SUCCESS, data });
        }

    } catch (error) {
        yield put({ type: SHIFT.SHIFT_ERROR, error })
    }

    return true

}


export function* getShiftWatchcer() {
    while (true) {

        console.log('Watching GET on SHIFT')

        const action = yield take([SHIFT.SHIFT_REQUESTING, SHIFT.SHIFT_DEL]);

        console.log('Watched  GET on SHIFT')
        console.log(URL[action.type])
        yield fork(getFlow, URL[action.type], action.id)

    }
}

export function* postShiftWatchcer() {
    while (true) {
        console.log('Watching POST on SHIFT')

        const action = yield take([SHIFT.SHIFT_ADD, SHIFT.SHIFT_EDIT])

        console.log('Watched  POST on SHIFT')
        console.log(action)
        yield fork(postFlow, action.newdata, URL[action.type])

    }
}
