import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as I from '../../../icons';
import * as G from '../../../global/helpers';
import * as GC from '../../../global/constants';
import { makeSelectLocale } from '../../../global/selectors';
// // ui
import { LinkTo, Span, FlexBox, navMenuHober, PositionedFlex } from '../../../ui';
// ///////////////////////////////////////////////////////
const navData = {
  ADMIN: [
    {
      name: 'General',
      path: GC.ROUTE_PATH_GENERAL_LIST,
    },
    {
      name: 'Venue Owners',
      path: GC.ROUTE_PATH_VENUES_OWNERS_LIST,
    },
    {
      name: 'Venues',
      path: GC.ROUTE_PATH_VENUES_LIST,
    },
    {
      name: 'Transactions',
      path: GC.ROUTE_PATH_TRANSACTIONS,
    },
  ],
  USER: [
    {
      name: 'Venues',
      path: GC.ROUTE_PATH_VENUES_LIST,
    },
    {
      name: 'My Profile',
      path: GC.ROUTE_PATH_PROFILE,
    },
    {
      name: 'Games',
      path: GC.ROUTE_PATH_GAMES_LIST,
    },
  ],
};

export const NavigationPanel = ({ location }) => {
  const user_permission = 'USER';
  const token = G.getToken();
  const nav= R.equals(user_permission, 'ADMIN') ? navData.ADMIN : navData.USER;
  // const handelSetUrl = () => {

  // }
  return (
    <FlexBox height='100%' width='max-content' >
      {
        R.or(nav, []).map(
          (route, i) => {
            const activeRoute = R.equals(location.pathname, route.path);
            return (
            <LinkTo
              key={i}
              height='100%'
              // to={`${route.path}${token}`}
              to={route.path}
            >
              <FlexBox
                mx='20px'
                px='10px'
                height='100%'
                fontSize='20px'
                cursor='pointer'
                fontWeight='bold'
                width='max-content'
                alignItems='center'  
                justifyContent='center'
                additionalStyles={navMenuHober}
                borderRadius={R.and(activeRoute, '1px')}
                color={activeRoute ? '#327FF2' : '#9A9BAA'}
                borderBottom={R.and(activeRoute, '3px solid #327FF2')}
                // onClick={() => handelSetUrl(route)}
              >
                {route.name}
              </FlexBox>
            </LinkTo>
          )}
        )
      }
    </FlexBox>
  )
};

export const Header = (props) => (
  <PositionedFlex
    top='0'
    left='0'
    bg='#fff'
    px='25px'
    zIndex='100'
    height='100px'
    minWidth='100%'
    position='absolute'
    width='max-content'
    alignItems='center'
    justifyContent='center'
  >
    <FlexBox
      width='100%'
      height='100%'
      minWidth='800px'
      maxWidth='1400px'
      alignItems='center'
      justifyContent='space-between'
    >
      <FlexBox
        width='200px'
        fontSize='30px'
        fontWeight='bold'
        flexDirection='column'
        justifyContent='center'
      >
        Agate
        <Span
          color='#4A4B59'
          fontSize='20px'
          fontWeight='100'
        >
          Venue Owner
        </Span>
      </FlexBox>
      <NavigationPanel
        location={R.pathOr({}, ['locale', 'location'], props)}
      />
      <LinkTo
        height='40px'
        to={GC.ROUTE_PATH_SING_IN}
        onClick={() => props.sendLogoutRequest()}
      >
        <FlexBox
          width='200px'
          height='100%' 
          fontSize='20px'
          color='#9A9BAA'
          cursor='pointer'
          fontWeight='bold'
          alignItems='center' 
          justifyContent='flex-end'
        >
          <FlexBox
            mr='20px'
            height='25px'
            alignItems='center'  
          >
            {I.logOut()}
          </FlexBox>
          Logout
        </FlexBox>
      </LinkTo>
    </FlexBox>
  </PositionedFlex>
);

const mapStateToProps = (state) => (createStructuredSelector({
  locale: makeSelectLocale(state)
}));

export default connect(mapStateToProps, {
})(Header);
