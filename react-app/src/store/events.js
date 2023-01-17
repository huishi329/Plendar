import { csrfFetch } from './csrf';

const GET_MONTH_EVENTS = 'events/getMonthEvents';

export const getEvents = (calendar_id, year, month) => async dispatch => {
    const response = await csrfFetch(`/api/calendars/${calendar_id}/events?${new URLSearchParams({
        year,
        // month number must be 1-12 for python calendar
        month: month + 1
    })}`);
    const events = await response.json();
    dispatch({ type: GET_MONTH_EVENTS, events })
}

const CREATE_EVENT = 'events/createEvent';

export const createEvent = requestBody => async dispatch => {
    const response = await csrfFetch('api/events', {
        method: 'POST',
        body: JSON.stringify(requestBody)
    });
    const event = await response.json();
    dispatch({ type: CREATE_EVENT, event });
    return event;
};

const UPDATE_EVENT = 'events/updateEvent';

export const updateEvent = (eventId, requestBody) => async dispatch => {
    const response = await csrfFetch(`/api/events/${eventId}`, {
        method: 'PUT',
        body: JSON.stringify(requestBody)
    });
    const event = await response.json();
    dispatch({ type: UPDATE_EVENT, event });
    return event;
};

const DELETE_EVENT = 'events/deleteEvent';

export const deleteEvent = (eventId) => async dispatch => {
    await csrfFetch(`api/events/${eventId}`, { method: 'DELETE' });
    dispatch({ type: DELETE_EVENT, eventId });
}

export const deleteEventsByCalendar = (calendarId) => async dispatch => {
    await csrfFetch(`/api/calendars/${calendarId}/events`, { method: 'DELETE' });
    dispatch(removeEvents(calendarId));
};

const REMOVE_EVENTS = 'events/removeEvents'

export const removeEvents = (calendar_id) => {
    return { type: REMOVE_EVENTS, calendar_id }
}

const UPDATE_EVENT_STATUS = 'events/updateEventStatus';

export const updateEventStatus = (eventId, guestId, status) => async dispatch => {
    await csrfFetch(`api/events_guests/${eventId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
    });
    dispatch({ type: UPDATE_EVENT_STATUS, eventId, guestId, status })
}

const CLEAR_EVENTS = 'events/clearEvents';

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
        case REMOVE_EVENTS:
            for (const event_id in newState) {
                if (newState[event_id].calendar_id === action.calendar_id) delete newState[event_id]
            }
            return newState;
        case CREATE_EVENT:
            newState[action.event.id] = action.event;
            return newState;
        case UPDATE_EVENT:
            newState[action.event.id] = action.event;
            return newState;
        case DELETE_EVENT:
            delete newState[action.eventId];
            return newState;
        case UPDATE_EVENT_STATUS:
            console.log(action);
            newState[action.eventId].guests[action.guestId].status = action.status;
            return newState;
        case CLEAR_EVENTS:
            return {}
        default:
            return state;
    }
}
