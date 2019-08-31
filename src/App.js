import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import styles from './assets/styles'
import store from './store'
import Routes from './routes'

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
