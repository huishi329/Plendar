import { csrfFetch } from './csrf';

const GET_EVENT = 'events/:eventId';

export const getEvent = (eventId) => async dispatch => {
    const response = await csrfFetch(`/api/events/${eventId}`)
    const event = await response.json();
    dispatch({ type: GET_EVENT, event });
}

export default function eventReducer(state = null, action) {
    const newState = { ...state };
    switch (action.type) {
        case GET_EVENT:
            return action.event
    }
}
