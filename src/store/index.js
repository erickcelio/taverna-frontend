import { combineReducers, createStore } from 'redux'

import { user } from './ducks'

const reducer = combineReducers({
  user
})

export default createStore(reducer)
