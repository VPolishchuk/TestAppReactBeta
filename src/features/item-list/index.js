import * as R from 'ramda';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import  bgHome from '../../static/bgHome.jpg';
// component
import SingInForm from '../auth';
// constants
import * as GC from '../../global/constants';
// icon
import * as I from '../../icons';
// helpers
import * as G from '../../global/helpers';
// ui
import { FlexBox, pulse, PositionedFlex } from '../../ui';
// features
import { makeSelectItemList } from './selectors';
import ItemCardBox from './components/item-card-box';
import ItemFormComponent from './components/create-item-form';
import { createItemRequest, deleteItemRequest } from './actions';
// /////////////////////////////////////////////////////////////////


export const ItemListComponent = (props) => {
  const [viewForm, setViewForm] = useState(false);
  const handlerOut = () => {
    G.clearSessionStore();
    G.goToRoute(GC.ROUTE_PATH_SING_IN)
    return;
  }
  const localeStoreAuth = G.getSessionStorage('auth');
  const auth = R.pathOr(false, ['loggedIn'], localeStoreAuth);
  return (
    auth ?
    <FlexBox
      width='100vw'
      minHeight='100vh'
      backgroundSize='auto'
      background={`url(${bgHome}) no-repeat rgba(255, 255, 250, 0.3) center;`}    
    >
      <PositionedFlex
        p='20px'
        width='100vw'
        minHeight='100vh'
        position='relative'
        height='max-content'
        flexDirection='column'
        alignItems='space-between'
        justifyContent='flex-start'
        bg='rgba(255, 255, 250, 0.3)'
      >
        <PositionedFlex
          mr='20px'
          top='30px'
          bg='#E5E5E5'
          right='70px'
          width='60px'
          height='60px'
          cursor='pointer'
          position='fixed'
          alignItems='center'
          borderRadius='30px'
          justifyContent='center'
          additionalStyles={pulse}
          onClick={() => handlerOut()}
          boxShadow='0px 10px 40px rgba(27, 0, 70, 0.15)'
        >
          {I.logOut()}
        </PositionedFlex>
        <FlexBox
          width='50%'
          flexWrap='wrap'
          justifyContent='flex-start'
        >
          {
            R.or(props.itemList, []).map(
              (item, i) => (
                <ItemCardBox
                  i={i}
                  key={i}
                  item={item}
                  deleteItemRequest={props.deleteItemRequest}
                />
              )
            )
          }
        </FlexBox>
        <ItemFormComponent
          width='400px'
          height='max-content'
          viewForm={viewForm}
          setViewForm={setViewForm}
          createItemRequest={props.createItemRequest}
        />
        <PositionedFlex
          bg='#E5E5E5'
          right='70px'
          width='60px'
          height='60px'
          bottom='30px'
          fontSize='26px'
          cursor='pointer'
          position='fixed'
          alignItems='center'
          borderRadius='30px'
          justifyContent='center'
          additionalStyles={pulse}
          onClick={() => setViewForm(!viewForm)}
          boxShadow='0px 10px 40px rgba(27, 0, 70, 0.15)'
        >
          +
        </PositionedFlex>
      </PositionedFlex>
    </FlexBox> :
    <Redirect
      component={SingInForm}
      to={GC.ROUTE_PATH_SING_IN}
    />
  );
};

const mapStateToProps = (state) => (createStructuredSelector({
  itemList: makeSelectItemList(state),
}));

export default connect(mapStateToProps, {
  createItemRequest,
  deleteItemRequest,
})(ItemListComponent);
