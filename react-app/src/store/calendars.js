import { csrfFetch } from './csrf';

const GET_CALENDARS = 'calendars/getCalendars'

export const getCalendars = () => async dispatch => {
    const response = await csrfFetch('api/calendars/current');
    const calendars = await response.json();

    dispatch({ type: GET_CALENDARS, calendars })

}

export default function calendarsReducer(state = null, action) {
    // const newState = { ...state }
    switch (action.type) {
        case GET_CALENDARS:
            return action.calendars.reduce((calendars, calendar) => {
                calendars[calendar.id] = calendar;
                return calendars;
            }, {})
        default:
            return state;
    }
}
