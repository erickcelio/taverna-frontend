import { UpdateGroupMutation, createGroupMutation, deleteGroupMutation } from '../graphql/mutations'

import GraphQLClient from './graphql'
import { getMyGroupsQuery } from '../graphql/queries'

export const getMyGroupsService = async () => {
  const { data } = await GraphQLClient.query({
    query: getMyGroupsQuery
  })

  return data.getMyGroups
}

export const createGroupService = async ({ name, image }) => {
  const { data } = await GraphQLClient.mutate({
    mutation: createGroupMutation,
    variables: { name, image }
  })

  return data.createGroup
}

export const editGroupService = async ({ name, image, _id }) => {
  const { data } = await GraphQLClient.mutate({
    mutation: UpdateGroupMutation,
    variables: { groupId: _id, name, image }
  })

  return data.updateGroup
}

export const deleteGroupService = async ({ _id }) => {
  const { data } = await GraphQLClient.mutate({
    mutation: deleteGroupMutation,
    variables: { groupId: _id }
  })
  return data.deleteGroup
}
