import {
  CLOCK_REQUESTING,
  CLOCK_SUCCESS,
} from "../actionTypes/clock.actiontypes";
export const clock = (payload) => ({
  type: CLOCK_REQUESTING,
  payload,
});

export const clockSuccess = (payload) => ({
  type: CLOCK_SUCCESS,
  payload,
});
