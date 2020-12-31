import {
    SIGNUP_REQUESTING,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
  } from '../actionTypes/signup.actiontypes'

  const initialState = {
    requesting: false,
    successful: false,
    errors: [],
  }
  
  const reducer = function signupReducer (state = initialState, action) {
    switch (action.type) {
      case SIGNUP_REQUESTING:
        return {
          requesting: true,
          successful: false,
          errors: [],
        }
  
      case SIGNUP_SUCCESS:
        return {
          errors: [],
          requesting: false,
          successful: true,
        }
  
      case SIGNUP_ERROR:
        return {
          errors: action.error,
          requesting: false,
          successful: false,
        }
  
      default:
        return state
    }
  }
  
  export default reducer
  