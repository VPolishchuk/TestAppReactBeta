import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
// // conponent
// import SingInForm from '../features/auth/sing-in-form';
// // constants
// import * as GC from '../global/constants';
// // global
// import * as G from '../global/helpers';
// constants
import {
  FlexBox
} from '../ui';
// ///////////////////////////////////////////////////////

const ListComponent = () => (
  <FlexBox
    bg='#E5E5E5'
    width='100vw'
    height='100vh'
    alignItems='center'
    flexDirection='column'
    justifyContent='center'
  >
awd;lwa;lkdlkwaj
  </FlexBox> 
);
export const App = (props) => {
  // const user_permission = 'USER';
  // const currentRoutes= R.equals(user_permission, 'ADMIN') ? routes.ADMIN : routes.USER;
  // const sessionStore = G.getAuthSessionStorage();
  // const auth = R.pathOr(false, ['loggedIn'], sessionStore);
  return (
    <ListComponent />
    // <Redirect
    //   component={SingInForm}
    //   to={GC.ROUTE_PATH_SING_IN}
    // />
  );
};

const mapStateToProps = (state) => (createStructuredSelector({
}));

export default connect(mapStateToProps, {
})(App);
