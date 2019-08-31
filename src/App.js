import { Provider } from 'react-redux'
import React from 'react'
import Routes from './routes'
import { ThemeProvider } from 'styled-components'
import store from './store'
import styles from './assets/styles'

const { styles: { Container } } = styles

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={{ mode: 'dark' }}>
        <Container>
          <Routes />
        </Container>
      </ThemeProvider>
    </Provider>
  )
}

export default App
