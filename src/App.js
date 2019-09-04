import { Provider } from 'react-redux'
import React from 'react'
import Routes from './routes'
import { ThemeProvider } from 'styled-components'
import { store, persistor } from './store'
import styles from './assets/styles'
import { PersistGate } from 'redux-persist/integration/react'

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
