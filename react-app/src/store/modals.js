const SET_SIGNUP_MODAL = 'modals/setSignUpModal';
const SET_SIGNIN_MODAL = 'modals/setSignInModal';
const SET_CURRENT_EVENT = 'modals/setCurrentEvent';
const SET_CURRENT_DATE = 'modals/setCurrentDate';

export const setSignUpModal = showSignUpModal => {
    return { type: SET_SIGNUP_MODAL, showSignUpModal };
};
export const setSignInModal = showSignInModal => {
    return { type: SET_SIGNIN_MODAL, showSignInModal };
};
export const setCurrentEvent = event => {
    return { type: SET_CURRENT_EVENT, event }
};
export const setCurrentDate = date => {
    return { type: SET_CURRENT_DATE, date }
}

export default function modalsReducer(state = {}, action) {
    switch (action.type) {
        case SET_SIGNUP_MODAL:
            return { ...state, showSignUpModal: action.showSignUpModal };
        case SET_SIGNIN_MODAL:
            return { ...state, showSignInModal: action.showSignInModal };
        case SET_CURRENT_EVENT:
            return { ...state, event: action.event };
        case SET_CURRENT_DATE:
            return { ...state, date: action.date };
        default:
            return state;
    }
};
