import * as R from 'ramda';
import React, { useState } from 'react';
// components
import TextComponent from '../../../components/common/text';
// constants
import * as G from '../../../global/helpers';
import * as GC from '../../../global/constants';
// icon
import * as I from '../../../icons';
// ui
import {
  Box,
  Span,
  Input,
  FlexBox,
  PositionedFlex
} from '../../index';
// ui
import { hoverDeleteDoc } from  './ui';
// ///////////////////////////////////////////////////////////////////////////////////

export const UploadFilesBox = (props) => {
  const documents = R.pathOr([], ['documents'], props).map(({ name }) => name);
  const [nameOfFiles, setFileName] = useState(documents);
  const handelDeleteFileFromInput = (e) => {
    if(props.setUpDoc) {
      setFileName(null)
      props.setFieldValue(props.fileName, []);
      return;
    }
    props.deleteAction(R.path(['documents'], props));
  }
  const handleSetFileData = (event) => {
    const file = props.values[props.fileName];
    const appendedFile = event.currentTarget.files[0];
    setFileName(R.path(['name'], file))
    setFileName(R.append(R.path(['name'], appendedFile), nameOfFiles));
    const data = R.append(appendedFile, file);
    props.setFieldValue(props.fileName, data);
  }
  return (
    <PositionedFlex
      flexWrap='wrap'
      overflow='auto'
      cursor='pointer'
      owerflow='hidden'
      width={props.width}
      position={props.position}
      alignItems={props.alignItems}
      borderRadius={props.borderRadius}
      height={R.or(props.height, '170px')}
      justifyContent={props.justifyContent}
      border={R.or(props.border, '1px dashed #9A9BAA')}
    >
      <PositionedFlex
        top='0'
        right='0'
        zIndex='3'
        color='red'
        width='20px'
        height='20px'
        borderRadius='5px'
        position='absolute'
        alignItems='center'
        justifyContent='center'
        border='1px dashed #9A9BAA'
        onClick={(e) => handelDeleteFileFromInput(e)}
      >
        X
      </PositionedFlex>
      {
        G.isNotNilAndNotEmpty(nameOfFiles) ?
        <PositionedFlex
          top='0'
          left='0'
          zIndex='1'
          width='100%'
          height='100%'
          fonSize='18px'
          color='#9A9BAA'
          textAlign='center'
          position='absolute'
          alignItems='center'
          flexDirection='column' 
          justifyContent='center'
          additionalStyles={hoverDeleteDoc}
        >
          {
            nameOfFiles.map(
              (name, i) =>(
                <FlexBox
                  key={i}
                  px='15px'
                  width='100%'
                  alignItems='center'
                >
                  <TextComponent
                    key={i}
                    my='5px'
                    width='100%'
                    title={name}
                    withEllipsis
                    fontSize='16px'
                    color='#327FF2'
                    maxWidth='250px'
                    textAlign='left'
                    whiteSpace='pre'
                    fontWeight='bold'
                    wordBreak='break-word'
                    textDecoration='underline'
                  >
                    {name}
                  </TextComponent>
                </FlexBox>
              )
            )
          }
        </PositionedFlex> :
        <PositionedFlex
          top='0'
          left='0'
          zIndex='1'
          width='100%'
          height='100%'
          fonSize='18px'
          color='#9A9BAA'
          textAlign='center'
          position='absolute'
          alignItems='center'
          flexDirection='column' 
          justifyContent='center'
        >
          Drop your files here
          <br/>
          <br/>
            or
          <br/>
          <Box
            color='#fff'
            p='5px 10px'
            bg='#BCBDCA'
            borderRadius='10px'
          >
            Upload Files
          </Box>
        </PositionedFlex>
      }
      <Input
        value=''
        multiple
        zIndex='2'
        type='file'
        opacity='0'
        width='100%'
        border='none'
        accept='.pdf'
        height='100%'
        cursor='pointer'
        onChange={(event) => handleSetFileData(event)}
        title={R.pathOr('', ['value', 'name'], props)}
      />
    </PositionedFlex>
)}

                  