import { all, call, put, takeLatest } from 'redux-saga/effects'
import { createGroupService, editGroupService } from '../../services/group'
import { createGroupSuccessAction, editGroupSuccessAction } from './actions'

import { groupsTypes } from '../types'

function * createGroup ({ group, onFinish, onFinishWithError }) {
  try {
    const newGroup = yield call(createGroupService, group)
    yield put(createGroupSuccessAction({ group: newGroup }))
    onFinish()
  } catch (e) {
    onFinishWithError(e)
  }
}

function * editGroup ({ group, onFinish, onFinishWithError }) {
  try {
    const newGroup = yield call(editGroupService, group)
    yield put(editGroupSuccessAction({ group: newGroup }))
    onFinish()
  } catch (e) {
    onFinishWithError(e)
  }
}

export default all([
  takeLatest(groupsTypes.CREATE_GROUP_REQUEST, createGroup),
  takeLatest(groupsTypes.EDIT_GROUP_REQUEST, editGroup)
])
