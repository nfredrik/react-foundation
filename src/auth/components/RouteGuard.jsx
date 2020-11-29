import React from 'react';

import { 
  Redirect,
  Route
} from 'react-router-dom';

import {
  connect
} from 'react-redux';

import {
  useAppContext
} from '../AppProvider';

// use this component, instead of the regular <Route> component from the React Router library, when a route is to be
// protected (= requiring user authentication).
let RouteGuard = ({ component: Component, ...rest }) => {
  const auth = useAppContext();

  return (
    <Route {...rest} render={(props) => (
      auth?.user
        ? <Component {...props} />
        : <Redirect to={{
            pathname: "/login",
            state: {
              from: props.location
            }
          }} />
    )}
    />
  );
}

RouteGuard = connect(
  ({ auth }) => ({
    user: auth.user
  })
)(RouteGuard);

export { RouteGuard };