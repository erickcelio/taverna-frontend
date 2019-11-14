import { authTypes } from '../types'

export const authLoginAction = ({ user, token }) => {
  return {
    type: authTypes.LOGIN,
    payload: {
      user,
      token,
      isLogged: true
    }
  }
}

export const authLogoutAction = () => {
  return {
    type: authTypes.LOGOUT
  }
}
