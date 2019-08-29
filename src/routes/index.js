import React from 'react'
import PrivateRoute from './privateRoute'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { LoginPage } from '../pages'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute path="/app" component={() => <h1>App</h1>} />
      <Route exact path="/" component={LoginPage} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
)

export default Routes
