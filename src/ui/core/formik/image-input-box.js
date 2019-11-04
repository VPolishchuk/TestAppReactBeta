import * as R from 'ramda';
import React, { useState, useEffect } from 'react';
// constants
import * as G from '../../../global/helpers';
// image
// import LandscapeWhite  from '../../../static/images/landscape-white.png';
// import LandscapeGrey  from '../../../static/images/landscapeGrey.png';
// ui
import {
  Input,
  FlexBox,
  PositionedFlex,
  PositionedImage } from '../../../ui';
//////////////////////////////////////////////////////////

export const ImageInputBox = (props) => {
  const [url, setUrl] = useState(null);
  const [fileData, setFileData] = useState({});
  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (G.isNilOrEmpty(file)) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setUrl(reader.result);
    setFileData(file);
  }

  const handleAddImages = () => {
  if (R.and(G.isNilOrEmpty(url), G.isNilOrEmpty(fileData))) return;
    const fileDataObj = {
      url: url,
      file: fileData,
    };
    props.handleSetImagesAndFiles(fileDataObj);
  }
  
  const handleDeleteImage = () => {
    setUrl(null);
    setFileData({});
    if(G.isNotNilAndNotEmpty(props.handleDeleteImage)) {
      props.handleDeleteImage(true);
    }
  }

  useEffect(() => {
    if(G.isNotNilAndNotEmpty(props.url)) {
      setUrl(props.url);
    }
  }, [props.url])
  return (
    <PositionedFlex
      flexWrap='wrap'
      cursor='pointer'
      minHeight='150px'
      position='relative'
      borderRadius='10px'
      alignItems='center'
      height={props.height}
      backgroundSize='auto'
      justifyContent='center'
      border='1px dashed grey'
      border='1px dashed grey'
      width={R.or(props.width, '100%')}
      // background={`url(${LandscapeWhite}) no-repeat center #9A9BAA;`}
    >
      <PositionedFlex
        bg='#fff'
        zIndex='3'
        top='-7px'
        width='20px'
        height='20px'
        right='-7px'
        flexWrap='wrap'
        cursor='pointer'
        position='absolute'
        borderRadius='10px'
        alignItems='center'
        justifyContent='center'
        border='1px dashed grey'
        onClick={() => handleDeleteImage()}
      >
        X
      </PositionedFlex>
      <PositionedFlex
        bg='#fff'
        zIndex='3'
        bottom='-7px'
        width='30px'
        height='30px'
        right='-7px'
        flexWrap='wrap'
        cursor='pointer'
        fontWeight='bold'
        position='absolute'
        borderRadius='10px'
        alignItems='center'
        justifyContent='center'
        border='1px dashed grey'
        onClick={() => handleAddImages()}
      >
        +
      </PositionedFlex>
      <PositionedImage
        alt='image'
        width='100%'
        height='100%'
        objectFit='fill'
        position='absolute'
        borderRadius='10px'
        src={R.or(url, null)}
        zIndex={G.isNilOrEmpty(url) ?  '-1' : '1'}
      />
      <Input
        multiple
        zIndex='2'
        type='file'
        opacity='0'
        width='100%'
        border='none'
        height='100%'
        accept='image/*'
        cursor='pointer'
        onChange={(e) => handleChangeImage(e)}
      />
    </PositionedFlex>
  )
}

export const ImageWrapComponent = ({
  height,
  fields,
  flexDirection
}) => (
  <FlexBox
    height={R.or(height, '100%')}
    flexDirection={R.or(flexDirection, 'row')}
  >
    {
      fields.map(
        (item, i) => (
          <ImageInputBox
            key={i}
            {...item}
          />
        )
      )
    }
  </FlexBox>
)
export default ImageWrapComponent;
