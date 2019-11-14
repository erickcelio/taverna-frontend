import { selectedGroupTypes } from '../types'

export const selectGroupAction = ({ group }) => {
  return {
    type: selectedGroupTypes.SELECT_GROUP,
    payload: {
      group
    }
  }
}
