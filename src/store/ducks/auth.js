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
  login: ({ user, token }) => {
    return {
      type: Types.LOGIN,
      payload: {
        user,
        token,
        isLogged: true
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
      return action.payload
    }
    case Types.LOGOUT: {
      return initialState
    }
    default: {
      return state
    }
  }
}
