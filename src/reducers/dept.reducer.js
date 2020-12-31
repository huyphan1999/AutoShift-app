import * as COMPANY from "../actionTypes/company.actiontypes";

const initialState = {
  requesting: false,
  successful: false,
  data: [
    // {
    //     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    //     title: 'Giám đốc',
    //     note: 'Phòng Giám Đốc'
    // },
    // {
    //     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    //     title: 'Dịch vụ',
    //     note: 'Phòng Dịch Vụ'
    // },
    // {
    //     id: '58694a0f-3da1-471f-bd96-145571e29d72',
    //     title: 'Kế toán',
    //     note: 'Phòng Kế Toán'
    // },
  ],
};

const reducer = function companyReducer(state = initialState, action) {
  switch (action.type) {
    case COMPANY.DEPT_REQUESTING:
      return {
        ...state,
        requesting: true,
      };

    case COMPANY.DEPT_SUCCESS:
      return {
        ...state,
        requesting: false,
        successful: true,
        data: action.data,
      };

    case COMPANY.DEPT_ERROR:
      return {
        ...state,
        branch_message: action.error,
        successful: false,
        requesting: false,
      };

    case COMPANY.DEPT_ADD:
      return {
        ...state,
        requesting: true,
      };

    case COMPANY.DEPT_DEL:
      return {
        ...state,
        requesting: true,
      };
    case COMPANY.DEPT_EDIT:
      return {
        ...state,
        requesting: false,
      };

    default:
      return state;
  }
};
export default reducer;
