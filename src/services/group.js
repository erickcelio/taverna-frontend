import api from './api'

const groupEndpoint = '/group'

export const getMyGroupsService = async () => {
  const { data } = await api.get('group?myGroups=true&withRoles=true&withMembers=true')
  return data
}

export const createGroupService = async ({ name, image }) => {
  const { data } = await api.post(groupEndpoint, { name, image })
  return data
}