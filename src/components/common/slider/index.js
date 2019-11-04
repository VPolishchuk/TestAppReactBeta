import * as R from 'ramda';
import React, { useState } from 'react';
// ui
import {
  Image,
  FlexBox,
  PositionedFlex  } from '../../../ui';
// ////////////////////////////////////////////////////////////

export const SliderComponent = (props) => {
  const [ imageIndex, setIndex ] = useState(0)
  // const handleSetNexIndex = (nextIndex) => (
  //   setIndex(R.gte(nextIndex, props.data.length) ? 0 : nextIndex)
  // )
  // const handleSetPrevIndex = (prevIndex) => {
  //   setIndex(R.lt(prevIndex, 0) ? props.data.length - 1 : prevIndex)
  // }
  return (
    <FlexBox
      width='100%'
      p='10px 15px'
      height='600px'
      minWidth='600px'
      overflow='hidden'
      alignItems='center'
      flexDirection='column'
      justifyContent='center'
    >
      {/* <PositionedFlex
        width='100%'
        height='550px'
        overflow='hidden'
        border='1px solid'
        borderRadius='15px'
        alignItems='center'
        position='relative'
        justifyContent='center'
      >
        <PositionedFlex
          top='0'
          left='0'
          height='600px'
          alignItems='center'
          width='max-content'
          position='absolute'
          justifyContent='space-between'
          transition='transform 0.5s linear'
          transform={`translateX(-${imageIndex * (100 / props.data.length)}%)`}
        >
          {
            props.data.map(
              (item, index) => (
                <FlexBox
                  bg='#fff'
                  key={index}
                  width='100%'
                  height='600px'
                  minWidth='600px'
                  alignItems='center'
                  borderRadius='15px'
                  border='3px solid red'
                  backgroundSize='cover'
                  justifyContent='center'
                  background={`url(${item}) no-repet center #fff;`}
                >
                  {item}image
                </FlexBox>
              )
            )
          }
        </PositionedFlex>
      </PositionedFlex> */}
      <Image
        alt='image'
        width='100%'
        height='100%'
        objectFit='cover'
        borderRadius='20px'
        src={props.data[imageIndex].imagePath}
        src={R.pathOr([], ['data', imageIndex, 'imagePath'], props)}
      />
      <FlexBox
        py='5px'
        width='100%'
        alignItems='center'
        justifyContent='center'
      >
        {
          props.data.map(
            (item, index) => (
              <FlexBox
                mx='7px'
                key={index}
                width='15px'
                height='15px'
                cursor='pointer'
                borderRadius='10px'
                onClick={() => setIndex(index)}
                bg={R.equals(index, imageIndex)? '#327FF2' : '#C4C4C4'}
              />
            )
          )
        }
      </FlexBox>
    </FlexBox>
  )
};

export default SliderComponent;
