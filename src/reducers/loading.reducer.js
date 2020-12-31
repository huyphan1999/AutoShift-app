import {
  HIDE_SPINNER,
  SET_LOADING,
  SHOW_SPINNER,
} from "../actionTypes/app.actiontypes";

const intialState = {
  appLoading: false,
};

function loadingReducer(state = intialState, action) {
  const { payload } = action;
  switch (action.type) {
    case SET_LOADING:
      console.log("INITIALIZE_APP Reducer");
      return { ...state, appLoading: payload };

    case HIDE_SPINNER:
      console.log("INITIALIZE_APP Reducer");
      return { ...state, [payload]: false };

    case SHOW_SPINNER:
      console.log("INITIALIZE_APP Reducer");
      return { ...state, [payload]: true };

    default:
      return state;
  }
}
