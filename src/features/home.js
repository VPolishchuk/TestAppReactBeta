import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
// component
import { AuthContext } from '../firebase';
import ItemListComponent from './item-list';
// /////////////////////////////////////////////////////////////////

export const HomeComponent = ({...rest }) => {
    const { currentUser } = useContext(AuthContext);
    return (
      <Route
        {...rest}
        render={routeProps =>
          !! currentUser ? (
            <ItemListComponent {...routeProps} />
          ) : (
            <Redirect to={"/sing-in"} />
          )
        }
      />
    );
};

export default HomeComponent;