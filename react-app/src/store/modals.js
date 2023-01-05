const SET_SIGNUP_MODAL = 'modals/setSignUpModal';
const SET_SIGNIN_MODAL = 'modals/setSignInModal';
const SET_DELETE_CALENDAR_MODAL = 'modals/setDeleteCalendarModal';
const SET_SAVE_SETTING_MODAL = 'modals/setSaveSettingModal'
const SET_PROFILE_DROPDOWN = 'modals/setProfileDropdown'
const SET_CURRENT_EVENT = 'modals/setCurrentEvent';
const SET_CURRENT_DATE = 'modals/setCurrentDate';
const SET_CURRENT_CALENDAR = 'modals/setCurrentCalendar';

export const setSignUpModal = showSignUpModal => {
    return { type: SET_SIGNUP_MODAL, showSignUpModal };
};
export const setSignInModal = showSignInModal => {
    return { type: SET_SIGNIN_MODAL, showSignInModal };
};
export const setDeleteCalendarModal = showDeleteCalendarModal => {
    return { type: SET_DELETE_CALENDAR_MODAL, showDeleteCalendarModal };
};
export const setSaveSettingModal = showSaveSettingModal => {
    return { type: SET_SAVE_SETTING_MODAL, showSaveSettingModal };
};
export const setProfileDropdown = showProfileDropdown => {
    return { type: SET_PROFILE_DROPDOWN, showProfileDropdown };
};
export const setCurrentEvent = event => {
    return { type: SET_CURRENT_EVENT, event };
};
export const setCurrentDate = date => {
    return { type: SET_CURRENT_DATE, date };
};
export const setCurrentCalendar = calendar => {
    return { type: SET_CURRENT_CALENDAR, calendar }
};

export default function modalsReducer(state = {}, action) {
    switch (action.type) {
        case SET_SIGNUP_MODAL:
            return { ...state, showSignUpModal: action.showSignUpModal };
        case SET_SIGNIN_MODAL:
            return { ...state, showSignInModal: action.showSignInModal };
        case SET_DELETE_CALENDAR_MODAL:
            return { ...state, showDeleteCalendarModal: action.showDeleteCalendarModal };
        case SET_PROFILE_DROPDOWN:
            return { showProfileDropdown: action.showProfileDropdown }
        case SET_SAVE_SETTING_MODAL:
            return { showSaveSettingModal: action.showSaveSettingModal }
        case SET_CURRENT_EVENT:
            return { event: action.event };
        case SET_CURRENT_DATE:
            return { date: action.date };
        case SET_CURRENT_CALENDAR:
            return { ...state, calendar: action.calendar }
        default:
            return state;
    }
};
