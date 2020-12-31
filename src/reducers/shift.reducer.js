import * as SHIFT from '../actionTypes/shift.actiontypes';

const initialState = {
    requesting: false,
    successful: false,
    message: [],
    data: [
        {
            id: 'CA_VAN_PHONG',
            title: 'Ca Văn Phòng',
            timeStart: '8:30',
            timeEnd: '17:30',
            branch: 'VP Công ty',
            uptime: [true, false, true, true, true, false, true]
        },
        {
            id: 'CA_VAN_PHONG1',
            title: 'Ca Văn Phòng',
            timeStart: '8:30',
            timeEnd: '17:30',
            branch: 'VP Công ty',
            uptime: [true, false, false, true, true, false, true]
    
        },
        {
            id: 'CA_VAN_PHONG2',
            title: 'Ca Văn Phòng',
            timeStart: '8:30',
            timeEnd: '17:30',
            branch: 'VP Công ty',
            uptime: [false, false, true, false, true, false, true]
        },
    ],
}

const reducer = function companyReducer(state = initialState, action) {
    switch (action.type) {
        case SHIFT.SHIFT_REQUESTING:
            return {
                ...state,
                requesting: true,
            }

        case SHIFT.SHIFT_SUCCESS:
            return {
                ...state,
                requesting: false,
                successful: true,
                shifts: action.data
            }

        case SHIFT.SHIFT_ERROR:
            return {
                ...state,
                message: action.error,
                successful: false,
                requesting: false
            }

        case SHIFT.SHIFT_ADD:
            return {
                ...state,
                requesting: true,
            }

        case SHIFT.SHIFT_DEL:
            return {
                ...state,
                requesting: true,
            }
        case SHIFT.SHIFT_EDIT:
            return {
                ...state,
                requesting: false,
            }
        default : return state
    }
}

export default reducer
