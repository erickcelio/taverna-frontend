import { groupsTypes } from '../types'
import produce from 'immer'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case groupsTypes.CREATE_GROUP_SUCCESS:
      return produce(state, draft => {
        draft.push(action.payload.group)
      })

    case groupsTypes.EDIT_GROUP_SUCCESS:
      return produce(state, draft => {
        const { group } = action.payload
        const groupIndex = draft.findIndex(({ _id }) => _id === group._id)
        draft[groupIndex] = group
      })

    case groupsTypes.SET_GROUPS:
      return action.payload.groups

    case groupsTypes.REMOVE_GROUP:
      return state.filter(group => group._id !== action.payload.group._id)

    default:
      return state
  }
}
