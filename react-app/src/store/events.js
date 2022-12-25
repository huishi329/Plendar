import { csrfFetch } from './csrf';

const GET_MONTH_EVENTS = 'events/getMonthEvents';

export const getEvents = (calendar_id, year, month) => async dispatch => {
    const response = await csrfFetch(`/api/calendars/${calendar_id}/events?${new URLSearchParams({
        year,
        month
    })}`);
    const events = await response.json();
    dispatch({ type: GET_MONTH_EVENTS, events })
}

const CLEAR_EVENTS = 'events/clearEvents'

export const clearEvents = () => {
    return { type: CLEAR_EVENTS }
}

export default function eventsReducer(state = {}, action) {
    const newState = { ...state };
    switch (action.type) {
        case GET_MONTH_EVENTS:
            return action.events.reduce((events, event) => {
                events[event.id] = event;
                return events;
            }, newState);
        case CLEAR_EVENTS:
            return {}
        default:
            return state;
    }
}
