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

const REMOVE_NONE_DISPLAY_EVENTS = 'events/removeNoneDisplayEvents'

export const removeEvents = (calendar_id) => {
    return { type: REMOVE_NONE_DISPLAY_EVENTS, calendar_id }
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
        case REMOVE_NONE_DISPLAY_EVENTS:
            for (const event_id in newState) {
                if (newState[event_id].calendar_id === action.calendar_id) delete newState[event_id]
            }
            return newState;
        case CLEAR_EVENTS:
            return {}
        default:
            return state;
    }
}
