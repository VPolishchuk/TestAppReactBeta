import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';
import { createBrowserHistory as createHistory } from 'history';
import {
  Route,
  Switch } from 'react-router-dom';
import {
  ConnectedRouter,
  routerMiddleware } from 'react-router-redux';
// root
import mainSaga from './saga';
import createStore from './store';
import routes from './routes-config';
// ui
import { RootWrapper } from './ui';
//////////////////////////////////////////////

export const history = createHistory();

const store = createStore(
  mainSaga,
  routerMiddleware(history)
);

export const RouteWithSubRoutes = (route) => (
  <Route
    path={route.path}
    render={(props) => (
      <route.component {...props} routes={route.routes} />
    )}
  />
);

const RootContainer = withRouter((props) => (
  <Switch>
    {props.routes.map((route, i) => (
      <RouteWithSubRoutes key={i} {...route} />
    ))}
  </Switch>
));

//TODO: after add here redux-store and create auth-component  structure in this file will be changed
class AppRouter extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <RootWrapper>
            <ThemeProvider theme={{}}>
              <RootContainer routes={routes} />
            </ThemeProvider>
          </RootWrapper>
        </ConnectedRouter>
      </Provider>
    )
  }
};

export default AppRouter;
