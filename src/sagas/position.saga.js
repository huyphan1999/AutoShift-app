import { take, fork, call, put } from 'redux-saga/effects'

// Our POSITION actiontypes
import * as COMPANY from '../actionTypes/company.actiontypes'
import * as URL from './url.constant';

// So that we can modify our User piece of state

//Utils
import { postRequest, getRequest } from '../utils/request'
import { navigate } from '../utils/navigate';


function* postFlow(newdata, url) {

    try {
        const res = yield call(postRequest, url, newdata);
        yield put({ type: COMPANY.POS_REQUESTING })
    } catch (error) {
        yield put({ type: COMPANY.POS_ERROR, error })
    }
    // return the token 
    return true
}


function* getFlow(url, id) {

    try {
        const res = yield call(getRequest, url, id);
        if (id) {
            yield put({ type: COMPANY.POS_REQUESTING })

        } else {
            var { data } = res
            console.log('Poss reponse')
            console.log(data)
            yield put({ type: COMPANY.POS_SUCCESS, data });
        }

    } catch (error) {
        yield put({ type: COMPANY.POS_ERROR, error })
    }

    return true

}


export function* getPosWatchcer() {
    while (true) {

        console.log('Watching GET on POSITION')

        const action = yield take([COMPANY.POS_REQUESTING, COMPANY.POS_DEL]);

        console.log('Watched  GET on POSITION')
        
        yield fork(getFlow, URL[action.type], action.id)

    }
}

export function* postPosWatchcer() {
    while (true) {
        console.log('Watching POST on POSITION')

        const action = yield take([COMPANY.POS_ADD, COMPANY.POS_EDIT])

        console.log('Watched  POST on POSITION')

        yield fork(postFlow, action.newdata, URL[action.type])

    }
}
