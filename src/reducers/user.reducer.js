import {
  USER_SET,
  USER_UNSET,
  USER_IN,
  USER_OUT,
} from '../actionTypes/user.actiontypes';

const initialSate = {
  // token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vcDEudGFuY2Eudm4vYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE1Nzc2OTk2MjMsIm5iZiI6MTU3NzY5OTYyMywianRpIjoid2xLbVoxY2NyWTZuZjg5eSIsInN1YiI6IjVkZjlmMGU3MGJjYzk4MThmZTBiNzI5YSIsInBydiI6ImY5Zjc2YTEyMGFmNThlNTZjNWQ0NTEzZmMxZDI2YmZjZDVhZDc5MWUiLCJ0ZXN0IjoxLCJzaG9wX2lkIjoiNWRmOWYwZTcwYmNjOTgxOGZlMGI3Mjk5In0.UsPPH8v5jDhDEdBP7XxYGhz29zJwhzfblWK-IRRFeHs',
  // user: {
  //   id: '5df9f0e70bcc9818fe0b729a',
  //   name: null,
  //   full_name: 'Nguyễn Hoàng Giang',
  //   email: 'tanca@gmail.com',
  //   is_root: 1,
  //   shop_id: '5df9f0e70bcc9818fe0b7299',
  //   position_id: '',
  //   branch_id: '',
  //   dep_id: '',
  //   shop: {
  //     id: '5df9f0e70bcc9818fe0b7299',
  //     name: 'tanca'
  //   },
  //   position: [],
  //   branch: [],
  //   dep: []
  // },
  // isIn: false
};
const reducer = function UserReducer(state = initialSate, action) {
  switch (action.type) {
    case USER_SET:
      return {
        ...state,
        ...action.data,
      };

    case USER_UNSET:
      return {
        ...state,
        token: null,
        user: {},
        isIn: false,
      };

    case USER_IN:
      return {
        ...state,
        isIn: true,
      };

    case USER_OUT:
      return {
        ...state,
        isIn: false,
      };

    default:
      return state;
  }
};

export default reducer;
