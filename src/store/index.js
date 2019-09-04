import auth from './ducks/auth'
import storage from 'redux-persist/lib/storage'
import { combineReducers, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'

const reducers = combineReducers({
  auth
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

export {
  store, persistor
}
