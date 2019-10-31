import * as R from 'ramda';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import { createStructuredSelector } from 'reselect';
// icon
import * as I from '../../../icons';
// ui
import { FlexBox, Text, PositionedFlex } from '../../../ui';
// features
import { createItemRequest } from '../actions';
import { makeSelectItemList } from '../selectors';
// /////////////////////////////////////////////////////////////////


export const ItemCardBox = ({
  i,
  item,
  deleteItemRequest
}) => {
  const { name, price, total, location, guid, } = item;
  const [open, setOpenCard] = useState(false);
  return (
    <PositionedFlex
      m='15px'
      bg='#E5E5E5'
      width='250px'
      height='300px'
      fontSize='45px'
      cursor='pointer'
      borderRadius='15px'
      alignItems='center'
      position='relative'
      flexDirection='column'
      justifyContent='center'
      // onMouseOver={() => setOpenCard(true)}
      // onMouseLeave={() => setOpenCard(false)}
      onClick={() => setOpenCard(!open)}
      boxShadow='0px 10px 40px rgba(27, 0, 70, 0.15)'
    >
      <PositionedFlex
        zIndex='3'
        top='-7px'
        width='40px'
        right='-7px'
        height='40px'
        cursor='pointer'
        alignItems='center'
        borderRadius='12px'
        position='absolute'
        justifyContent='center'
        onClick={() => deleteItemRequest(guid)}
        boxShadow='0px 10px 40px rgba(27, 0, 70, 0.15)'
      >
        {I.trashIcon()}
      </PositionedFlex>
      {
        open ?
        <FlexBox
          width='100%'
          fontWeight='bold'
          fontSize='14px'
          alignItems='center'
          flexDirection='column'
        >
          <Text>name: {name}</Text>
          <Text>price: {price}</Text>
          <Text>total: {total}</Text>
          <Text>location: {location}</Text>
        </FlexBox> : 
        i
      }
    </PositionedFlex>
  );
};

export default ItemCardBox;
