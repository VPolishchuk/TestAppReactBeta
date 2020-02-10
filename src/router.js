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
// features
import PrivateRoute from './features/home';
import SingInForm from './features/auth/index';
import ProtectedPage from './features/item-list/index';
import DetailPageComponent from './features/item-list/component/detail-page';
import NoMatch from './features/error-page';
// root
import mainSaga from './saga';
import createStore from './store';
import routes from './routes-config';
import FirebaseProvider from './firebase';
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
    <Route path="*">
      <NoMatch />
    </Route>
  </Switch>
));

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
