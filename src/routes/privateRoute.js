import { Redirect, Route } from 'react-router-dom'

import PropTypes from 'prop-types'
import React from 'react'
import SideBar from '../components/SideBar'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const Container = styled.div`
  margin-left: 65px;
  width: 100%;
  height: 100%;
`

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLogged } = useSelector(state => state.auth)

  return (
    <Route
      { ...rest }
      render={props => isLogged
        ? (
          <>
            <SideBar {...props} />
            <Container>
              <Component {...props}/>
            </Container>
          </>
        )
        : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )}
    />
  )
}
PrivateRoute.propTypes = {
  component: PropTypes.any,
  location: PropTypes.object
}

export default PrivateRoute
