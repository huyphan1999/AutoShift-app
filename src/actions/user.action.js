import { USER_SET, USER_UNSET } from '../actionTypes/user.actiontypes'


export function setUSER (data) {
  console.log(`Set user:${data}`)
  return {
    type: USER_SET,
    data
  }
}

export function unsetUSER () {
  return {
    type: USER_UNSET,
  }
}
