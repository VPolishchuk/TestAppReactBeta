import React from 'react';
import * as R from 'ramda';
// ui
import { Button } from '../../../ui';
/// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ButtonComponent = (props) => (
  <Button
    p={props.p}
    m={props.m}
    bg={props.bg}
    type={props.type}
    width={props.width}
    color={props.color}
    height={props.height}
    cursor={props.cursor}
    border={props.border}
    display={props.display}
    hoverBg={props.hoverBg}
    minWidth={props.minWidth}
    fontSize={props.fontSize}
    borderBRR={props.borderBLR}
    alignSelf={props.alignSelf}
    borderBLR={props.borderBLR}
    minHeight={props.minHeight}
    alignItems={props.alignItems}
    hoverColor={props.hoverColor}
    fontFamily={props.fontFamily}
    fontWeight={props.fontWeight}
    justifySelf={props.justifySelf}
    hoverBorder={props.hoverBorder}
    borderRadius={props.borderRadius}
    flexDirection={props.flexDirection}
    textTransform={props.textTransform}
    textDecoration={props.textDecoration}
    justifyContent={props.justifyContent}
    additionalStyles={props.additionalStyles}
    onClick={() => props.onAction && props.onAction()}
  >
    {props.text}
  </Button>
);

export default ButtonComponent;
