// Types
export const Types = {
  LOGIN: 'auth/LOGIN',
  LOGOUT: 'auth/LOGOUT'
}

// Initial State
const initialState = {
  isLogged: false,
  token: null,
  user: {}
}

// Actions
export const actions = {
  login: (username, password) => {
    return {
      type: Types.LOGIN,
      payload: {
        username,
        password
      }
    }
  },
  logout: () => {
    return {
      type: Types.LOGOUT
    }
  }
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN: {
      return state
    }
    case Types.LOGOUT: {
      return initialState
    }
    default: {
      return state
    }
  }
}
