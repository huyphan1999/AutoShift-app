import { INITIALIZE_APP } from '../actionTypes/app.actiontypes';

export const initializeApp = () => ({
  type: INITIALIZE_APP,
});

export const getRequest = function companyRequest(request, id) {
  return {
    type: request,
    id
  }
}
export const postRequest = function postRequest(request, newdata) {
  return {
    type: request,
    newdata
  }
}
