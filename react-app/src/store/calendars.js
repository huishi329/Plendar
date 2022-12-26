import { csrfFetch } from './csrf';
import { getEvents, removeEvents } from './events';

const GET_CALENDARS = 'calendars/getCalendars'

export const getCalendars = () => async dispatch => {
    const response = await csrfFetch('api/calendars/current');
    const calendars = await response.json();

    dispatch({ type: GET_CALENDARS, calendars })
}

const TOGGLE_CALENDAR = 'calendars/toggleCalendar'

export const toggleCalendar = (calendar_id) => async dispatch => {
    console.log('toggleCalendar', calendar_id);
    const response = await csrfFetch(`/api/users_calendars/current/${calendar_id}`, {
        method: "PATCH"
    })
    const calendar = await response.json();
    if (calendar.is_displayed) dispatch(getEvents(calendar.id))
    else dispatch(removeEvents(calendar.id))
    dispatch({ type: TOGGLE_CALENDAR, calendar });
}

export default function calendarsReducer(state = null, action) {
    const newState = { ...state };
    switch (action.type) {
        case GET_CALENDARS:
            return action.calendars.reduce((calendars, calendar) => {
                calendars[calendar.id] = calendar;
                return calendars;
            }, {})
        case TOGGLE_CALENDAR:
            newState[action.calendar.id] = action.calendar;
            return newState;
        default:
            return state;
    }
}
