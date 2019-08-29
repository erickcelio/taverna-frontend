import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Container } from './styles'
import Login from './login'
import { Provider } from 'react-redux'
import store from '../store'

function App () {
  return (
    <Provider store={store}>
      <ThemeProvider theme={{ mode: 'dark' }}>
        <Container>
          <Login />
        </Container>
      </ThemeProvider>
    </Provider>
  )
}

export default App
