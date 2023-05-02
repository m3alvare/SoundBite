import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import SignInForm from '../authentication/SignIn';
import SignUpPage from '../authentication/SignUp';
import LandingPage from '../authentication/Landing';
import HomePage from '../main/Home';
import history from './history';

export default function PrivateRoute({
  authenticated,
  ...rest
}) {
  return (

    <Router history={history}>
      <Switch>
        <Route
          path="/" exact
          {...rest}
          render={props =>
            authenticated === true ? (
              <HomePage {...props} {...rest} />
            ) : (
              <LandingPage {...props} {...rest} />
            )
          }
        />
        <Route path="/SignIn" component={SignInForm} />
        <Route path="/SignUp" component={SignUpPage} />

      </Switch>
    </Router>
  );
}