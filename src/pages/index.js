/* eslint-disable no-unused-vars */
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Container } from './styles'
import Login from './login'

function App () {
  return (
    <ThemeProvider theme={{ mode: 'dark' }}>
      <Container>
        <Login />
      </Container>
    </ThemeProvider>
  )
}

export default App
