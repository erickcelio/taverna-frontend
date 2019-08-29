import auth from './ducks/auth'
import { combineReducers, createStore } from 'redux'

const reducers = combineReducers({
  auth
})

export default createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
