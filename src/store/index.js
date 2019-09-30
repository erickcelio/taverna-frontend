import { combineReducers, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'

import auth from './ducks/auth'
import groups from './ducks/groups'
import selectedGroup from './ducks/selectedGroup'
import storage from 'redux-persist/lib/storage'

const reducers = combineReducers({
  auth,
  groups,
  selectedGroup
})

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducers)
const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
const persistor = persistStore(store)

export { store, persistor }
