import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

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
  component: PropTypes.object,
  location: PropTypes.object
}

export default PrivateRoute
