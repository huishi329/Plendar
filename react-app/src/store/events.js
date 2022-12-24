import { csrfFetch } from './csrf';

const GET_MONTH_EVENTS = 'events/getMonthEvents';

export const getEvents = (calendar_id, year, month) => async dispatch => {
    const response = await csrfFetch(`/api/calendars/${calendar_id}/events?${new URLSearchParams({
        year,
        month
    })}`);
    const events = await response.json();
    console.log(events, 'events');
    dispatch({ type: GET_MONTH_EVENTS, events })
}

export default function eventsReducer(state = {}, action) {
    const newState = { ...state };
    switch (action.type) {
        case GET_MONTH_EVENTS:
            return action.events.reduce((events, event) => {
                events[event.id] = event;
                return events;
            }, newState);
        default:
            return state;
    }
}
