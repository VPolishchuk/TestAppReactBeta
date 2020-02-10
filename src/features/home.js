import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
// component
import { AuthContext } from '../firebase';
// /////////////////////////////////////////////////////////////////
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// conponent
import { RouteWithSubRoutes } from '../router';
import SingInForm from '../features/auth/index';
// constants
import * as C from '../global/constants';
// global
// ///////////////////////////////////////////////////////

export const App = (props) => {
  const { currentUser } = useContext(AuthContext);
  return (
    !! currentUser ? 
    <>
      {props.routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...props} {...route}  />
      ))}
    </> :
    <Redirect
      component={SingInForm}
      to={C.ROUTE_PATH_SING_IN}
    />

  );
};

const mapStateToProps = (state) => (createStructuredSelector({
}));

export default connect(mapStateToProps, {
})(App);
