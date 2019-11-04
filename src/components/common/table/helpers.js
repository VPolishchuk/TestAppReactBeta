import * as R from 'ramda';
import React from 'react';
// global
import * as G from '../../../global/helpers';
import * as GC from '../../../global/constants';
// ui
import TextComponent from '../text';
import { Box, FlexBox } from '../../../ui';
//////////////////////////////////////////////////////

const checkStatusColor = {
  [GC.STATUS_APPROVED]: <Box color='#27AE60' fontWeight='bold' textAlign='center'>Approved</Box>,
  [GC.STATUS_SUSPENDED]: <Box color='#EB5757' fontWeight='bold'textAlign='center'>Suspended</Box>,
  [GC.STATUS_PENDING_REVIEW]: <Box color='#F2994A' fontWeight='bold' textAlign='center'>Pending Review</Box>,
};

export const checkColumnContent = (columnName, objInfo) => {
  if (R.equals(columnName, 'sportTypes')) {
    return R.path([columnName], objInfo).map(
      (sport, i) => (
        <FlexBox
          key={i}
          pb='5px'
          width='100%'
          alignItems='flex-start'
          justifyContent='center'
        >
          {sport.name}
        </FlexBox>
      )
    );
  }
  if (R.is(Object, R.path([columnName], objInfo))) {
    return R.path([columnName, 'name'], objInfo);
  }
  if (R.equals(columnName, 'isActive')) {
    const status = R.path([columnName], objInfo);
    if (status) {
      return (
        <Box color='#27AE60' fontWeight='bold' textAlign='center'>Approved</Box>
      )
    }
    return (
      <Box color='#EB5757' fontWeight='bold' textAlign='center'>Suspended</Box>
    )
    // return checkStatusColor[R.pathOr('', [columnName], objInfo)];
  }
  return R.pathOr('', [columnName], objInfo);
};
