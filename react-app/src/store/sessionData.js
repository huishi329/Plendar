
const SET_YEAR = 'sessionData/setYear';

export const setYear = year => {
    return { type: SET_YEAR, year }
}

const SET_MONTH = 'sessionData/setMonth';

export const setMonth = month => {
    return { type: SET_MONTH, month }
}

export default function sessionDataReducer(state = {}, action) {
    switch (action.type) {
        case SET_YEAR:
            return { ...state, year: action.year };
        case SET_MONTH:
            return { ...state, month: action.month };
        default:
            return state;
    }
};
