import PropTypes from 'prop-types'
import React from 'react'

import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLogged } = useSelector(state => state.auth)

  return (
    <Route
      { ...rest }
      render={props => isLogged
        ? (
          <Component {...props}/>
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
