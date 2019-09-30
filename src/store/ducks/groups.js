// Types
import { useSelector } from 'react-redux'

export const Types = {
  ADD_GROUP: 'groups/ADD',
  SET_GROUPS: 'groups/SET',
  REMOVE_GROUP: 'groups/REMOVE'
}

// Initial State
const initialState = []

// Actions
export const actions = {
  addGroup: ({ group }) => {
    return {
      type: Types.ADD_GROUP,
      payload: {
        group
      }
    }
  },
  setGroups: ({ groups = [] }) => {
    return {
      type: Types.SET_GROUPS,
      payload: {
        groups
      }
    }
  }
}

export const removeGroupAction = ({ group }) => {
  return {
    type: Types.REMOVE_GROUP,
    payload: {
      group
    }
  }
}

// Selectors
export const useGroupsSelector = () => useSelector(state => state.groups, [])

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case Types.ADD_GROUP: {
      const { group } = action.payload
      const groupIndex = state.findIndex(({ _id }) => _id === group._id)
      if (groupIndex !== -1) {
        state[groupIndex] = group
      } else {
        state.push(action.payload.group)
      }
      return state
    }
    case Types.SET_GROUPS: {
      return action.payload.groups
    }
    case Types.REMOVE_GROUP: {
      return state.filter(group => group._id !== action.payload.group._id)
    }
    default: {
      return state
    }
  }
}
