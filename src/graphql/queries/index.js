import { gql } from 'apollo-boost'

export const signInQuery = gql`
  query SignIn(
      $username: String!
      $password: String!
    ){
    signIn(input: {
      username: $username,
      password: $password
    }) {
      token,
      user {
        name
        email
        avatar
      }
    }
  }
`

export const getMyGroupsQuery = gql`
  query {
    getMyGroups {
      _id
      name,
      image
    }
  }
`
