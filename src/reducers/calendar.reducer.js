import {
    CALENDAR_REQUESTING,
    CALENDAR_SUCCESS,
    CALENDAR_ERROR,
  } from '../actionTypes/calendar.actiontypes'

  const initialState = {
    requesting: false,
    successful: false,
    errors: [],
    data:[]
  }
  
  const reducer = function calendarReducer (state = initialState, action) {
    switch (action.type) {
      case CALENDAR_REQUESTING:
        return {...state,
          requesting: true,
        }
  
      case CALENDAR_SUCCESS:
        return {
          errors: [],
          requesting: false,
          successful: true,
          data:action.data
        }
  
      case CALENDAR_ERROR:
        return {...state,
          errors: action.error,
          requesting: false,
          successful: false,
        }
  
      default:
        return state
    }
  }
  
  export default reducer
  