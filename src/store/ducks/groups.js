// Types
export const Types = {
  ADD_GROUP: 'groups/ADD',
  SET_GROUPS: 'groups/SET'
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
  setGroups: ({ groups }) => {
    return {
      type: Types.SET_GROUPS,
      payload: {
        groups
      }
    }
  }
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case Types.ADD_GROUP: {
      state.push(action.payload.group)
      return state
    }
    case Types.SET_GROUPS: {
      return action.payload.groups
    }
    default: {
      return state
    }
  }
}
