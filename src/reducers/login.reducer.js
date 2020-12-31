import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from "../actionTypes/login.actiontypes";

const initialState = {
  requesting: false,
  successful: false,
  errors: {},
};

const reducer = function loginReducer(state = initialState, action) {
  switch (action.type) {
    // Set the requesting flag and append a message to be shown
    case LOGIN_REQUESTING:
      return {
        requesting: true,
        successful: false,
        errors: "",
      };
    // Successful?  Reset the login state.
    case LOGIN_SUCCESS:
      return {
        errors: "",
        requesting: false,
        successful: true,
      };

    // Append the error returned from our api
    // set the success and requesting flags to false
    case LOGIN_ERROR:
      console.log("Login reducer");
      console.log(action.error);
      return {
        errors: action.error,
        requesting: false,
        successful: false,
      };

    default:
      return state;
  }
};

export default reducer;
