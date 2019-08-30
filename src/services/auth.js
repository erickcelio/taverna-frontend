import api from './api'

export const TOKEN_KEY = 'eshToken'

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const loginService = async ({ email, password }) => {
  const { data } = await api.post('/login', { email, password })
  const { user, token } = data
  console.log(user, token)
  localStorage.setItem(TOKEN_KEY, token)
  return data
}

export const logoutService = () => {
  localStorage.removeItem(TOKEN_KEY)
}
