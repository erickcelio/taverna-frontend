import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost'

import { endPoints } from '../config'
import { getToken } from './auth'

const httpLink = new HttpLink({ uri: endPoints.graphql })

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: getToken() || ''
    }
  })

  return forward(operation)
})

const GraphQLClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default GraphQLClient
