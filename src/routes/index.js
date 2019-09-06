import AppPages from './AppPages'
import PrivateRoute from './privateRoute'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { RecoveryPage, SignInPage, SignUpPage } from '../pages'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      { AppPages.map(({ path, component, name }) => (
        <PrivateRoute path={path} key={name} component={component} />
      )) }
      <Route exact path="/" component={SignInPage} />
      <Route path="/register" component={SignUpPage} />
      <Route path="/recovery" component={RecoveryPage} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
)

export default Routes
