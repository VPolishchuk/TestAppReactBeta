import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { createBrowserHistory as createHistory } from 'history';
import {
  Route,
  Switch } from 'react-router-dom';
import {
  ConnectedRouter,
  routerMiddleware } from 'react-router-redux';
// root
import createStore from './store';
import routes from './routes-config';
import FirebaseProvider from './firebase';
//////////////////////////////////////////////

export const history = createHistory();

const store = createStore(
  routerMiddleware(history)
);

const RootContainer = withRouter((props) => (
  <Switch>
    {
      props.routes.map(
        (route, i) => (
          <Route key={i} {...route} />
        )
      )
    }
  </Switch>
));

//TODO: after add here redux-store and create auth-component  structure in this file will be changed
class AppRouter extends Component {
  render() {
    return (
      <FirebaseProvider>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <>
              <RootContainer routes={routes} />
            </>
          </ConnectedRouter>
        </Provider>
      </FirebaseProvider>
    )
  }
};

export default AppRouter;
