import { authTypes } from '../types'

const initialState = {
  isLogged: false,
  token: null,
  user: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case authTypes.LOGIN:
      return action.payload

    case authTypes.LOGOUT:
      return initialState

    default:
      return state
  }
}
