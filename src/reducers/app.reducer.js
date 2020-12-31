import {INITIALIZE_APP} from '../actionTypes/app.actiontypes';

const intialState = {
  appInitialized: false,
};

function appReducer(state = intialState, action) {
  switch (action.type) {
    case INITIALIZE_APP:
      console.log('INITIALIZE_APP Reducer')
      return Object.assign(state, {
        appInitialized: true,
      });
    default:
      return state;
      
  }
}

export default appReducer;

/*const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'JWT fefege...'
  }
  
  axios.post(Helper.getUserAPI(), data, {
  headers: headers
  })
  .then((response) => {
  dispatch({
  type: FOUND_USER,
  data: response.data[0]
  })
  })
  .catch((error) => {
  dispatch({
  type: ERROR_FINDING_USER
  })
  })
  `*/