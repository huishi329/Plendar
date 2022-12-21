const SET_SIGNUP_MODAL = 'modals/setSignUpModal';
const SET_SIGNIN_MODAL = 'modals/setSignInModal';

export const setSignUpModal = showSignUpModal => { return { type: SET_SIGNUP_MODAL, showSignUpModal }; };
export const setSignInModal = showSignInModal => { return { type: SET_SIGNIN_MODAL, showSignInModal }; };

export default function modalsReducer(state = {}, action) {
    switch (action.type) {
        case SET_SIGNUP_MODAL:
            return { ...state, showSignUpModal: action.showSignUpModal };
        case SET_SIGNIN_MODAL:
            return { ...state, showSignInModal: action.showSignInModal };
        default:
            return state;
    }
};
