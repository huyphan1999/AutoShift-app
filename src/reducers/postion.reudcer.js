import * as COMPANY from '../actionTypes/company.actiontypes';

const initialState = {
    requesting: false,
    successful: false,
    data: [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'Trưởng phòng',
            note: '',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Nhân viên',
            note: '',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Kế toán trưởng',
            note: '',
        },
    ],
}

const reducer = function companyReducer(state = initialState, action) {
    switch (action.type) {
        case COMPANY.POS_REQUESTING:
            return {
                ...state,
                requesting: true,
            }

        case COMPANY.POS_SUCCESS:
            return {
                ...state,
                requesting: false,
                successful: true,
                data: action.data
            }

        case COMPANY.POS_ERROR:
            return {
                ...state,
                branch_message: action.error,
                successful: false,
                requesting: false
            }

        case COMPANY.POS_ADD:
            return {
                ...state,
                requesting: true,
            }

        case COMPANY.POS_DEL:
            return {
                ...state,
                requesting: true,
            }
        case COMPANY.POS_EDIT:
            return {
                ...state,
                requesting: false,
            }

        default:
            return state
    }
}
export default reducer
