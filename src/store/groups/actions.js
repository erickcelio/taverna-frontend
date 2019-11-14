import { groupsTypes } from '../types'
import { noop } from 'lodash'

export const createGroupRequestAction = ({ group }, onFinish = noop, onFinishWithError = noop) => {
  return {
    type: groupsTypes.CREATE_GROUP_REQUEST,
    group,
    onFinish,
    onFinishWithError
  }
}

export const createGroupSuccessAction = ({ group }) => {
  return {
    type: groupsTypes.CREATE_GROUP_SUCCESS,
    payload: {
      group
    }
  }
}

export const editGroupRequestAction = ({ group }, onFinish = noop, onFinishWithError = noop) => {
  return {
    type: groupsTypes.EDIT_GROUP_REQUEST,
    group,
    onFinish,
    onFinishWithError
  }
}

export const editGroupSuccessAction = ({ group }) => {
  return {
    type: groupsTypes.EDIT_GROUP_SUCCESS,
    payload: {
      group
    }
  }
}

export const setGroupsAction = ({ groups = [] }) => {
  return {
    type: groupsTypes.SET_GROUPS,
    payload: {
      groups
    }
  }
}

export const removeGroupAction = ({ group }) => {
  return {
    type: groupsTypes.REMOVE_GROUP,
    payload: {
      group
    }
  }
}
