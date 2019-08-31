import React from 'react'
import PrivateRoute from './privateRoute'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { SignInPage, SignUpPage } from '../pages'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute path="/app" component={() => <h1>App</h1>} />
      <Route exact path="/" component={SignInPage} />
      <Route exact path="/register" component={SignUpPage} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
)

export default Routes
