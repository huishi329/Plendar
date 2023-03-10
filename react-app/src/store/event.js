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

export const updateEventStatusOnSave = (eventId, status) => async () => {
    await csrfFetch(`/api/events_guests/${eventId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
    });
};

const ADD_GUEST = 'event/addGuest';

export const addGuest = (email, user) => async dispatch => {
    const response = await csrfFetch(`/api/users?email=${email}`);
    const guest = await response.json();

    dispatch({ type: ADD_GUEST, guest, user });
};

const REMOVE_GUEST = 'event/removeGuest';

export const removeGuest = (guestId) => {
    return { type: REMOVE_GUEST, guestId };
};

export const updateEventGuests = (eventId, guests) => async () => {
    await csrfFetch(`/api/events/${eventId}/guests`, {
        method: 'POST',
        body: JSON.stringify({ guests })
    });
};

const UPDATE_TENTATIVE_GUEST_PERMISSION = 'event/updateTentativeGuestPermission';

export const updateTentativeGuestPermission = (permission) => {
    return { type: UPDATE_TENTATIVE_GUEST_PERMISSION, permission }
}

export const updateGuestPermissions = (eventId, permissions) => async () => {
    await csrfFetch(`/api/events/${eventId}`, {
        method: 'PATCH',
        body: JSON.stringify({ ...permissions })
    });
}

const CLEAR_EVENT = 'event/clearEvent';

export const clearEvent = () => {
    return { type: CLEAR_EVENT }
}

export default function eventReducer(state = null, action) {
    const newState = { ...state };
    newState.guests = { ...newState.guests };
    switch (action.type) {
        case GET_EVENT:
            return action.event;
        case UPDATE_TENTATIVE_EVENT_STATUS:
            newState.guests[action.userId].status = action.status;
            return newState;
        case UPDATE_TENTATIVE_GUEST_PERMISSION:
            newState[action.permission] = !newState[action.permission]
            return newState;
        case ADD_GUEST:
            if (!newState.guests || Object.values(newState.guests).length === 0) {
                newState.guests = {};
                newState.guests[action.user.id] = Object.assign(action.user, { status: 'yes' })
            }
            if (action.guest.id in newState.guests === false)
                newState.guests[action.guest.id] = Object.assign(action.guest, { status: 'awaiting' });
            return newState;
        case REMOVE_GUEST:
            delete newState.guests[action.guestId];
            return newState;
        case CLEAR_EVENT:
            return null;
        default:
            return state;
    }
}
