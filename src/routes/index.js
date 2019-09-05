import React from 'react';
import { AuthContext } from './AuthContext';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'


import Auth from './Auth';
import Forget from './Forget';
import Login from './Login';
import Register from './Register';


function AuthRoute({ component: Component, ...rest }) {
  return (
    <AuthContext.Consumer>
      {({ isAuthenticated }) =>
        <Route
          {...rest}
          render={props =>
            isAuthenticated ? (
              <Component {...props} />
            ) : (
                <Redirect to={{
                  pathname: '/login',
                  state: { from: props.location }
                }}
                />
              )
          }
        />
      }
    </AuthContext.Consumer>
  );
}

export default () => (
  <BrowserRouter>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/forget" component={Forget} />
    <AuthRoute path="/auth" component={Auth} />
  </BrowserRouter>
);
