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

const RootContainer = withRouter((props) => (
  <Switch>
    {/* {
      props.routes.map(
        (route, i) => (
          <Route key={i} {...route} />
        )
      )
    } */}
      <Route exact path="/sing-in" >
        <SingInForm {...props} />
      </Route>
      <PrivateRoute exact path="/">
        <ProtectedPage {...props} />
      </PrivateRoute>
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
