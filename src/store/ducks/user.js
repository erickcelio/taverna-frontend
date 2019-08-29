export const Types = {
  LOGIN: 'auth/LOGIN',
  LOGOUT: 'auth/LOGOUT'
};

export const authLogin = (token) => {
  return {
    type: Types.LOGIN,
    payload: {
      token
    }
  }
}

export const authLogout = () => {
  return {
    type: Types.LOGOUT
  }
}


const initialState = {
  isLogged: false,
  token: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.LOGIN:
      return { ...state, isLogged: true, token: action.payload.token };
    case Types.LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
}
