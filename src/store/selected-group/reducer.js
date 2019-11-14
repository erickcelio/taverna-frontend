import { selectedGroupTypes } from '../types'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case selectedGroupTypes.SELECT_GROUP:
      return action.payload.group

    default:
      return state
  }
}
