// Types
import { useSelector } from 'react-redux'

export const Types = {
  SELECT_GROUP: 'selectedGroups/SELECT'
}

// Initial State
const initialState = {}

// Actions
export const selectGroup = ({ group }) => {
  return {
    type: Types.SELECT_GROUP,
    payload: {
      group
    }
  }
}

// Selectors
export const useSelectedGroupSelector = () =>
  useSelector(state => state.selectGroup)

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case Types.SELECT_GROUP: {
      return action.payload.group
    }
    default: {
      return state
    }
  }
}
