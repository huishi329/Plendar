import { csrfFetch } from './csrf';

const GET_EVENT = 'event/getEvent';

export const getEvent = (eventId) => async dispatch => {
    const response = await csrfFetch(`/api/events/${eventId}`)
    const event = await response.json();
    dispatch({ type: GET_EVENT, event });
}

const UPDATE_TENTATIVE_EVENT_STATUS = 'event/updateTentativeEventGuestStatus';

export const updateTentativeEventStatus = (userId, status) => {
    return { type: UPDATE_TENTATIVE_EVENT_STATUS, userId, status }
}

const ADD_GUEST = 'event/addGuest';

export const addGuest = (email, user) => async dispatch => {
    const response = await csrfFetch(`/api/users?email=${email}`);
    const guest = await response.json();

    dispatch({ type: ADD_GUEST, guest, user })
};

const CLEAR_EVENT = 'event/clearEvent';

export const clearEvent = () => {
    return { type: CLEAR_EVENT }
}

export default function eventReducer(state = null, action) {
    const newState = { ...state };
    switch (action.type) {
        case GET_EVENT:
            return action.event;
        case UPDATE_TENTATIVE_EVENT_STATUS:
            newState.guests[action.userId].status = action.status;
            return newState;
        case ADD_GUEST:
            if (!newState.guests || Object.values(newState.guests) === 0) {
                newState.guests = {};
                newState.guests[action.user.id] = Object.assign(action.user, { status: 'yes' })
            } else {
                if (action.guest.id in newState.guests === false)
                    newState.guests[action.guest.id] = Object.assign(action.guest, { status: 'awaiting' });
            }
            return newState;
        case CLEAR_EVENT:
            return null;
        default:
            return state;
    }
}
