import { gql } from 'apollo-boost'

export const signUpMutation = gql`
  mutation SignUp(
    $name: String!
    $email: String!
    $username: String!
    $password: String!
  ){
    signUp(input: {
      name: $name
      username: $username
      email: $email
      password: $password
    }){
      name
      avatar
      email
    }
}
`

export const createGroupMutation = gql`
  mutation CreateGrop(
    $name: String!
    $image: String!
  ) {
    createGroup (input: {
      name: $name
      image: $image
    }) {
      _id
      name
      image
    }
  }
`

export const deleteGroupMutation = gql`
  mutation DeleteGroup(
    $groupId: ID!
  ) {
    deleteGroup(groupId: $groupId) {
      _id
    }
  }
`

export const UpdateGroupMutation = gql`
  mutation UpdateGroup(
    $groupId: ID!
    $name: String!
    $image: String!
  ) {
    updateGroup(input: {
      groupId: $groupId
      name: $name
      image: $image
    }) {
      _id
      name
      image
    }
  }
`
