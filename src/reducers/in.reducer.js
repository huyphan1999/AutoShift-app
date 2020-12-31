import {
    IN_REQUESTING,
    IN_SUCCESS,
    IN_ERROR,
} from '../actionTypes/in.actiontypes'


const initialState = {
    requesting: false,
    successful: false,
    errors: {},
}

const reducer = function loginReducer(state = initialState, action) {
    switch (action.type) {
        // Set the requesting flag and append a message to be shown
        case IN_REQUESTING:
            return {
                requesting: true,
                successful: false,
            }
        // Successful?  Reset the login state.
        case IN_SUCCESS:
            return {
                errors: "",
                requesting: false,
                successful: true,
            }

        // Append the error returned from our api
        // set the success and requesting flags to false
        case IN_ERROR:
            console.log('In reducer')
            console.log(action.error);
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