import api from './api'

export const TOKEN_KEY = 'eshToken'

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const loginService = async ({ username, password }) => {
  const { data } = await api.post('/login', { username, password })
  localStorage.setItem(TOKEN_KEY, data.token)
  return data
}

export const registerService = async ({ name, username, email, password }) => {
  const { data } = await api.post('/register', { name, username, email, password })
  localStorage.setItem(TOKEN_KEY, data.token)
  return data
}

export const logoutService = () => {
  localStorage.removeItem(TOKEN_KEY)
}
