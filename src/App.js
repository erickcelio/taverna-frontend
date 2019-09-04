import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import React from 'react'
import Routes from './routes'
import { ThemeProvider } from 'styled-components'
import styles from './assets/styles'
import { persistor, store } from './store'

const { styles: { Container } } = styles

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <ThemeProvider theme={{ mode: 'dark' }}>
          <Container>
            <Routes />
          </Container>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
