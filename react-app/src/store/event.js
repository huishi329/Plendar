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

export const addGuest = (email) => async dispatch => {
    const response = await csrfFetch(`/api/users?email=${email}`);
    const guest = response.json();

    dispatch({ type: ADD_GUEST, guest })
};

const CLEAN_EVENT = 'event/cleanEvent';

export const cleanEvent = () => {
    return { type: CLEAN_EVENT }
}

export default function eventReducer(state = null, action) {
    const newState = { ...state };
    switch (action.type) {
        case GET_EVENT:
            return action.event;
        case UPDATE_TENTATIVE_EVENT_STATUS:
            newState.guests[action.userId].status = action.status;
            return newState;
        // case ADD_GUEST:
        // // if ()
        case CLEAN_EVENT:
            return null;
        default:
            return state;
    }
}
