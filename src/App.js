import { persistor, store } from './store'

import { ApolloProvider } from '@apollo/react-hooks'
import GraphQLClient from './services/graphql'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import React from 'react'
import Routes from './routes'
import { ThemeProvider } from 'styled-components'
import styles from './assets/styles'

const { styles: { Container } } = styles

const App = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={GraphQLClient}>
        <PersistGate loading={null} persistor={persistor} >
          <ThemeProvider theme={{ mode: 'dark' }}>
            <Container>
              <Routes />
            </Container>
          </ThemeProvider>
        </PersistGate>
      </ApolloProvider>
    </Provider>
  )
}

export default App
