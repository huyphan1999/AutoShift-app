import { SIGNUP_REQUESTING } from '../actionTypes/signup.actiontypes'

const signupRequest = function signupRequest ( name, phone_number) {
  return {
    type: SIGNUP_REQUESTING,
    name,
    phone_number,
  }
}

export default signupRequest
