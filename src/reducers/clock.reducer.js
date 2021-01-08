import {
  CLOCK_REQUESTING,
  CLOCK_SUCCESS,
  CLOCK_ERROR,
} from "../actionTypes/clock.actiontypes";

const initialState = {
  requesting: false,
  successful: false,
  errors: {},
  clock: {},
};

const reducer = function clockReducer(state = initialState, action) {
  switch (action.type) {
    // Set the requesting flag and append a message to be shown
    case CLOCK_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
      };
    // Successful?  Reset the login state.
    case CLOCK_SUCCESS:
      return {
        ...state,
        errors: "",
        requesting: false,
        successful: true,
        clock: action.payload,
      };

    // Append the error returned from our api
    // set the success and requesting flags to false
    case CLOCK_ERROR:
      console.log("In reducer");
      console.log(action.error);
      return {
        ...state,
        errors: action.error,
        requesting: false,
        successful: false,
      };

    default:
      return state;
  }
};

export default reducer;
