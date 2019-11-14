import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'

import auth from './auth/reducer'
import createSagaMiddleware from 'redux-saga'
import groups from './groups/reducer'
import rootSaga from './root-saga'
import selectedGroup from './selected-group/reducer'
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

const sagaMonitor = process.env.NODE_ENV === 'development' ? console.tron.createSagaMonitor() : null
const sagaMiddleware = createSagaMiddleware({ sagaMonitor })

const enhancer = process.env.NODE_ENV === 'development'
  ? compose(applyMiddleware(sagaMiddleware), console.tron.createEnhancer(), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  : null

const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(
  persistedReducer,
  enhancer
)

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)

export default store
