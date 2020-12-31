import {call, put, takeLatest} from 'redux-saga/effects';
import {
  CALENDAR_REQUESTING,
  CALENDAR_SUCCESS,
  CALENDAR_ERROR,
} from '../actionTypes/calendar.actiontypes';

import {getRequest} from '../utils/request';
import {transformSection} from '../utils';

const calendarUrl = 'http://p1.tanca.vn/api/shift/list';

function* getCalendarFlow() {
  try {
    const res = yield call(getRequest, calendarUrl);
    var {data} = res;
    console.log('CALENDAR DATA');
    console.log(data);
    let transdata = transformSection(data);
    console.log(transdata);
    yield put({type: CALENDAR_SUCCESS, data: transdata});
  } catch (error) {
    yield put({type: CALENDAR_ERROR, error});
  }
}

export function* calendarWatcher() {
  console.log('CALENDAR WATCHING');
  yield takeLatest(CALENDAR_REQUESTING, getCalendarFlow);
}
