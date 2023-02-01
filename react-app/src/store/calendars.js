import { csrfFetch } from './csrf';
import { removeEvents } from './events';

const GET_CALENDARS = 'calendars/getCalendars'

export const getCalendars = () => async dispatch => {
    const response = await csrfFetch('/api/calendars/current');
    const calendars = await response.json();

    dispatch({ type: GET_CALENDARS, calendars });
}

const CREATE_CALENDAR = 'calendars/createCalendar';

export const createCalendar = requestBody => async dispatch => {
    const response = await csrfFetch('/api/calendars', {
        method: 'POST',
        body: JSON.stringify(requestBody)
    });

    const calendar = await response.json();
    dispatch({ type: CREATE_CALENDAR, calendar });
};

const UPDATE_CALENDAR = 'calendars/updateCalendar';

export const updateCalendar = (calendarId, requestBody) => async dispatch => {
    const response = await csrfFetch(`/api/calendars/${calendarId}`, {
        method: 'PUT',
        body: JSON.stringify(requestBody)
    });

    const calendar = await response.json();
    dispatch({ type: UPDATE_CALENDAR, calendar });
};

const DELETE_CALENDAR = 'calendars/deleteCalendar';

export const deleteCalendar = calendarId => async dispatch => {
    await csrfFetch(`/api/calendars/${calendarId}`, { method: 'DELETE' });
    dispatch({ type: DELETE_CALENDAR, calendarId });
    dispatch(removeEvents(calendarId));
}

const TOGGLE_CALENDAR = 'calendars/toggleCalendar'

export const toggleCalendar = (calendar_id) => async dispatch => {
    const response = await csrfFetch(`/api/users_calendars/current/${calendar_id}`, {
        method: "PATCH",
        body: JSON.stringify({})
    });
    const calendar = await response.json();
    if (!calendar.is_displayed) dispatch(removeEvents(calendar.id))
    dispatch({ type: TOGGLE_CALENDAR, calendar });
};

export const changeCalendarColor = (calendar_id, color) => async dispatch => {
    const response = await csrfFetch(`/api/users_calendars/current/${calendar_id}`, {
        method: "PATCH",
        body: JSON.stringify({ color })
    });
    const calendar = await response.json();
    dispatch({ type: TOGGLE_CALENDAR, calendar });
};

const CLEAR_CALENDARS = 'calendars/clearCalendars'

export const clearCalendars = () => {
    return { type: CLEAR_CALENDARS };
};

export default function calendarsReducer(state = null, action) {
    const newState = { ...state };
    switch (action.type) {
        case GET_CALENDARS:
            return action.calendars.reduce((calendars, calendar) => {
                calendars[calendar.id] = calendar;
                return calendars;
            }, {})
        case CREATE_CALENDAR:
            newState[action.calendar.id] = action.calendar;
            return newState;
        case UPDATE_CALENDAR:
            newState[action.calendar.id] = action.calendar;
            return newState;
        case DELETE_CALENDAR:
            delete newState[action.calendarId];
            return newState;
        case TOGGLE_CALENDAR:
            newState[action.calendar.id] = action.calendar;
            return newState;
        case CLEAR_CALENDARS:
            return {};
        default:
            return state;
    }
}
