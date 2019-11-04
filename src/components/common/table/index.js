import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// components
import TextComponent from '../text';
import ButtonComponent from '../button';
import { MultySelectFilter, FilterComponent } from '../filter';
// icons
import * as I from '../../../icons';
import * as G from '../../../global/helpers';
// ui
import {
  Box,
  FlexBox,
  PositionedFlex,
  tableScrollBarStyle } from '../../../ui';
// table
import { hoverRow } from './ui';
import {
  checkColumnContent } from './helpers';
///////////////////////////////////////////////////////////


const RowWrapper = (props) => (
  <FlexBox
    width='100%'
    minHeight='50px'
    cursor='pointer'
    height='max-content'
    additionalStyles={hoverRow()}
    bg={props.index && G.checkColorBg(props.index)}
    onClick={() =>  props.action && props.action(props.objInfo)}
  >
    {
      props.title.map(
        (item, i) => {
          return (
            <FlexBox
              key={i}
              p='15px'
              flex={item.flex}
              alignItems='center'
              flexDirection='column'
              textAlign={item.textAlign}
              justifyContent='flex-start'
            >
              {checkColumnContent(item.columnName, props.objInfo)}
            </FlexBox>
          )
        }
      )
    }
  </FlexBox>
);

const TableContent = ({columnSettings, action, list}) => (
  <PositionedFlex
    top='70px'
    width='100%'
    overflow='scroll'
    position='absolute'
    height='calc(100% - 70px)'
    justifyContent='flex-start'
    additionalStyles={tableScrollBarStyle}
  >
    <FlexBox
      width='100%'
      height='max-content'
      flexDirection='column'
      justifyContent='flex-start'
    >
      {
        // G.ifElse(
        //   G.isNotNilAndNotEmpty(list),
        //   <FlexBox
        //     flex='1'
        //     width='100%'
        //     fontSize='30px'
        //     alignItems='center'
        //     justifyContent='center'
        //   >
        //     Empty list
        //   </FlexBox>,
          R.or(list, []).map(
            (item, i) => (
              <RowWrapper
                key={i}
                objInfo={item}
                action={action}
                index={R.inc(i)}
                title={columnSettings}
              />
            )
          )
        // )
      }
    </FlexBox>
  </PositionedFlex>
);

const TableHeader = (props) => {
  return (
    <PositionedFlex
      top='0'
      left='0'
      width='100%'
      height='60px'
      position='absolute'
    >
      {
        props.columnSettings.map(
          (item, index) => (
            <FlexBox
              px='20px'
              key={index}
              flex={item.flex}
              alignItems='center'
              flexDirection='column'
              justifyContent='center'
              >
              <Box mb='5px'>
                {I.arrowVector()}
              </Box>
              <FlexBox
                color='#4A4B59'
                font-size='18px'
                fontWeight='bold'
              >
                {R.toUpper(item.title)}
                {
                  R.and(
                    R.has('option', item),
                    <Box ml='5px'>{I.arrowPolygon()}</Box>
                  )
                }
              </FlexBox>
            </FlexBox>
          )
        )
      }
    </PositionedFlex>
  )
};

export const Table = (props) => (
  <FlexBox
    flex='1'
    width='100%'
    bg='#F1F1F3'
    minHeight='300px'
    maxHeight='800px'
    borderRadius='15px'
    flexDirection='column'
    boxShadow='0px 10px 40px rgba(27, 0, 70, 0.15)'
  >
    {
      R.and(
        props.multyFilter,
        <MultySelectFilter
          filterData={props.filterData}
        />
      )
    }
    <PositionedFlex
      flex='1'
      width='100%'
      position='relative'
      flexDirection='column'
      justifyContent='center'
    >
      <TableHeader columnSettings={props.columnSettings} />
      <TableContent
        list={props.list}
        action={props.action}
        columnSettings={props.columnSettings}
      />
    </PositionedFlex>
    <FlexBox
      mb='15px'
      width='100%'
      height='30px'
      fontSize='16px'
      color='#4A4B59'
      alignItems='center'
      justifyContent='center'
    >
      Page
      <Box
        mx='5px'
        textAlign='center'
        transform='rotate(90deg)'
      >
        {I.arrowVector()}
      </Box>
      {R.or(props.numberPage, '1')}
      <Box
        mx='5px'
        textAlign='center'
        transform='rotate(-90deg)'
      >
        {I.arrowVector()}
      </Box>
    </FlexBox>
  </FlexBox>
);

export const TitleBox = (props) => (
  <FlexBox
    my='7px'
    px='10px'
    width='100%'
    height='60px'
    justifyContent='space-between'
  >
    <FlexBox
      mx='20px'
      fontSize='18px'
      color='#4A4B59'
      fontWeight='bold'
      alignItems='center'
    >
      {props.title}
    </FlexBox>
    <FlexBox alignItems='center'>
      {
        R.and(
          props.filter,
          <FilterComponent {...props} />
        )
      }
      {
        R.and(
          props.button,
          <ButtonComponent
            bg='#327FF2'
            color='#fff'
            p='5px 15px'
            border='none'
            height='40px'
            m='0 0 0 15px'
            minWidth='200px'
            cursor='pointer'
            fontWeight='bold'
            borderRadius='10px'
            text={props.buttomText}
            onAction={() => props.buttomActions()}
          />
        )
      }
    </FlexBox>
  </FlexBox>
);

const TableBox = (props) => (
  <FlexBox
    width='50%'
    height='100%'
    minWidth='450px'
    minHeight='300px'
    maxHeight='800px'
    flexDirection='column'
    borderRight='1px solid #9A9BAA'
  >
    <PositionedFlex
      flex='1'
      width='100%'
      position='relative'
      flexDirection='column'
      justifyContent='center'
    >
      <TableHeader columnSettings={props.columnSettings} />
      <TableContent
        list={props.list}
        action={props.action}
        columnSettings={props.columnSettings}
      />
    </PositionedFlex>
    <FlexBox
      mb='15px'
      width='100%'
      height='30px'
      fontSize='16px'
      color='#4A4B59'
      alignItems='center'
      justifyContent='center'
    >
      Page
      <Box
        mx='5px'
        textAlign='center'
        transform='rotate(90deg)'
      >
        {I.arrowVector()}
      </Box>
      {R.or(props.numberPage, '1')}
      <Box
        mx='5px'
        textAlign='center'
        transform='rotate(-90deg)'
      >
        {I.arrowVector()}
      </Box>
    </FlexBox>
  </FlexBox>
)

export const MultyTable = (props) => (
  <FlexBox
    width='100%'
    flexDirection='column'
  >
    <FlexBox
      width='100%'
    >
      {
        props.titleData.map(
          (item, i) => (
            <TitleBox
              key={i}
              width='50%'
              title={item.title}
              filter={item.filter}
              button={item.button}
              buttomActions={item.action}
              buttomText={item.buttomText}
            />
          )
        )
      }
    </FlexBox>
    <FlexBox
      width='100%'
      bg='#F1F1F3'
      height='100%'
      borderRadius='15px'
      boxShadow='0px 10px 40px rgba(27, 0, 70, 0.15)'
    >
      <TableBox {...props} />
      <TableBox
        list={props.activeList}
        columnSettings={props.rightColumnSettings}
      />
    </FlexBox>
  </FlexBox>
);

export const TableComponent = (props) => (
  <PositionedFlex
    mb='30px'
    width='100%'
    height='100% '
    minWidth='900px'
    maxWidth='1600px'
  >
      {
        props.multyTable ?
        <MultyTable {...props}/> :
        <FlexBox
          width='100%'
          height='100%'
          flexDirection='column'
        >
          <TitleBox {...props} />
          <Table {...props} />
        </FlexBox>
      }
  </PositionedFlex>
);

const mapStateToProps = (state) => (createStructuredSelector({
}));

export default connect(mapStateToProps, {
})(TableComponent);