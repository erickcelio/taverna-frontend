import api from './api'

export const getMyGroupsService = async () => {
  const { data } = await api.get('group?myGroups=true&withRoles=true&withMembers=true')
  return data
}
