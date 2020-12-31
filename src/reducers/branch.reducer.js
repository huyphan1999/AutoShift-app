import * as COMPANY from '../actionTypes/company.actiontypes';

const initialState = {
    requesting: false,
    successful: false,
    data: [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'Hà Nội',
            note: '',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Hồ Chí Minh',
            note: '',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Đà Nẵng',
            note: '',
        },
    ],
}

const reducer = function companyReducer(state = initialState, action) {
    switch (action.type) {
        case COMPANY.BRANCH_REQUESTING:
            return {
                ...state,
                requesting: true,
            }

        case COMPANY.BRANCH_SUCCESS:
            return {
                ...state,
                requesting: false,
                successful: true,
                data: action.data
            }

        case COMPANY.BRANCH_ERROR:
            return {
                ...state,
                branch_message: action.error,
                successful: false,
                requesting: false
            }

        case COMPANY.BRANCH_ADD:
            return {
                ...state,
                requesting: true,
            }

        case COMPANY.BRANCH_DEL:
            return {
                ...state,
                requesting: true,
            }
        case COMPANY.BRANCH_EDIT:
            return {
                ...state,
                requesting: false,
            }

        default:
            return state
    }
}
export default reducer
