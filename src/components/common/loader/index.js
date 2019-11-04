import React from 'react';
// ui
import { Box, PositionedFlex } from '../../../ui';
// loader
import { LoaderWrap } from './ui'
///////////////////////////////////////////////////////////

export const LoaderBox = () => {
  return (
    <PositionedFlex
      top='0'
      zIndex='1000'
      width='100vw'
      height='100vh'
      display='flex'
      position='fixed'
      alignItems='center'
      justifyContent='center'
      bg='rgba(53, 53, 53, 0.5)'
    >
      <LoaderWrap>
        <Box/>
        <Box/>
        <Box/>
        <Box/>
      </LoaderWrap>
    </PositionedFlex>
  )
};

export default LoaderBox;
