const SET_SIGNUP_MODAL = 'modals/setSignupModal';
const SET_SIGNIN_MODAL = 'modals/setSigninModal';

export const setSignupModal = showSignupModal => { return { type: SET_SIGNUP_MODAL, showSignupModal }; };
export const setSigninModal = showSigninModal => { return { type: SET_SIGNIN_MODAL, showSigninModal }; };

export default function modalsReducer(state = {}, action) {
    switch (action.type) {
        case SET_SIGNUP_MODAL:
            return { ...state, showSignupModal: action.showSignupModal };
        case SET_SIGNIN_MODAL:
            return { ...state, showSigninModal: action.showSigninModal };
        default:
            return state;
    }
};
