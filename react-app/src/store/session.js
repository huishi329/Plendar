import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';

const setUser = user => {
  return { type: SET_USER, user }
};


export const restoreUser = () => async dispatch => {
  try {
    const response = await csrfFetch('/api/session');
    const user = await response.json();
    await dispatch(setUser(user))
    return response;
  } catch (errorResponse) {
    console.log("Couldn't restore user");
  }
};


export const login = credentials => async dispatch => {
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  const user = await response.json();
  await dispatch(setUser(user));
  return user;
};


export const logout = () => async (dispatch) => {
  await csrfFetch('/api/session', { method: 'DELETE' });
  await dispatch(setUser(null));
};

export const signup = body => async (dispatch) => {
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify(body)
  });
  const user = await response.json();
  dispatch(setUser(user));
};

const initialState = { user: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.user }
    default:
      return state;
  }
}
