import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
// component
import { AuthContext } from '../firebase';
// /////////////////////////////////////////////////////////////////

export const HomeComponent = ({ children, ...rest }) => {
    const { currentUser } = useContext(AuthContext);
    return (
      <Route
        {...rest}
        render={routeProps =>
          !! currentUser ? (
            children
          ) : (
            <Redirect to={"/sing-in"} />
          )
        }
      />
    );
};

export default HomeComponent;