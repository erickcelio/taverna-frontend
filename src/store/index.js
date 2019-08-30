import auth from './ducks/auth'
import { combineReducers, createStore } from 'redux'
import { reducer as form } from 'redux-form'

const reducers = combineReducers({
  auth,
  form
})

export default createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
