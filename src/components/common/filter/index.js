import * as R from 'ramda';
import React, { useState } from 'react';
// icons
import * as I from '../../../icons';
import * as G from '../../../global/helpers';
// ui
import SelectInput from '../../../ui/core/formik/select';
import {
  Text,
  Input,
  PositionedFlex,
  ReactSelectWrapper } from '../../../ui';
///////////////////////////////////////////////////////////

export const MultySelectFilter = (props) => {
  const [value, setFieldValue] = useState('');
  return (
    <PositionedFlex
      width='100%'
      zIndex='100'
      p='10px 20px'
      alignItems='center'
      position='relative'
      justifyContent='flex-start'
    >
      {
        R.and(
          G.isNotNilAndNotEmpty(props.label),
          <Text
            mr='20px'
            alignItems='center'
          >
            {R.or(props.label, 'Filter by tags:')}
          </Text>
        )
      }
      <ReactSelectWrapper width={R.or(props.a, '300px')}>
        <SelectInput
          {...props}
          width='100%'
          isMulti={false}
          type='multiselect'
          setFieldValue={setFieldValue}
          options={R.or(props.filterData, [])}
        />
      </ReactSelectWrapper>
    </PositionedFlex>
)};

export const FilterComponent = (props) => (
  <PositionedFlex
    position='relative'
  >
    <Input
      type='search'
      width='350px'
      fontSize='16px'
      borderRadius='15px'
      p='2px 40px 2px 10px'
      placeholder='Search...'
      inputPlaceholderColor='#4A4B59'
    />
    <PositionedFlex
      top='5px'
      zIndex='2'
      right='5px'
      bottom='5px'
      bg='#327FF2'
      width='30px'
      height='30px'
      cursor='pointer'
      alignItems='center'
      position='absolute'
      borderRadius='10px'
      justifyContent='center'
      boxShadow='0px 4px 15px rgba(95, 34, 194, 0.05), 0px 4px 10px rgba(39, 0, 70, 0.05)'
    >
      {I.searchIcon()}
    </PositionedFlex>
  </PositionedFlex>
);
