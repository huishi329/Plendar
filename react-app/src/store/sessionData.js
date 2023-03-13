
const SET_YEAR = 'sessionData/setYear';
const SET_MONTH = 'sessionData/setMonth';
const SET_SIDE_CALENDAR_YEAR = 'sessionData/setSideCalendarYear';
const SET_SIDE_CALENDAR_MONTH = 'sessionData/setSideCalendarMonth';
const SET_SIDE_CALENDAR_DATE = 'sessionData/setSideCalendarDate';
const SET_RECORDING_TRANSCRIPT = 'sessionData/setRecordingTranscript';

export const setYear = year => {
    return { type: SET_YEAR, year };
};
export const setMonth = month => {
    return { type: SET_MONTH, month };
};
export const setSideCalendarYear = year => {
    return { type: SET_SIDE_CALENDAR_YEAR, year };
};
export const setSideCalendarMonth = month => {
    return { type: SET_SIDE_CALENDAR_MONTH, month };
};
export const setSideCalendarDate = date => {
    return { type: SET_SIDE_CALENDAR_DATE, date };
};
export const setRecordingTranscript = (inputField, transcript) => {
    return { type: SET_RECORDING_TRANSCRIPT, transcript, inputField };
};

export default function sessionDataReducer(state = {}, action) {
    switch (action.type) {
        case SET_YEAR:
            return { ...state, year: action.year };
        case SET_MONTH:
            return { ...state, month: action.month };
        case SET_SIDE_CALENDAR_YEAR:
            return { ...state, sideCalendarYear: action.year };
        case SET_SIDE_CALENDAR_MONTH:
            return { ...state, sideCalendarMonth: action.month };
        case SET_SIDE_CALENDAR_DATE:
            return { ...state, sideCalendarDate: action.date };
        case SET_RECORDING_TRANSCRIPT:
            return { ...state, transcript: action.transcript, inputField: action.inputField };
        default:
            return state;
    }
};
