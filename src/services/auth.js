import GraphQLClient from './graphql'
import { signInQuery } from '../graphql/queries'
import { signUpMutation } from '../graphql/mutations'

export const TOKEN_KEY = 'eshToken'

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const loginService = async ({ username, password }) => {
  const { errors, data } = await GraphQLClient.query({
    query: signInQuery,
    variables: { username, password },
    errorPolicy: 'all'
  })

  if (errors) {
    throw new Error(errors[0].message)
  }

  const { token, user } = data.signIn

  localStorage.setItem(TOKEN_KEY, token)
  return { token, user }
}

export const registerService = async ({ name, username, email, password }) => {
  const { data, errors } = await GraphQLClient.mutate({
    mutation: signUpMutation,
    variables: {
      name, username, email, password
    },
    errorPolicy: 'all'
  })

  if (errors) {
    throw new Error(errors[0].message)
  }

  return data.signUp
}

export const logoutService = () => {
  localStorage.removeItem(TOKEN_KEY)
}
