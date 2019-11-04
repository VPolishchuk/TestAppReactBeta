import React from 'react';
// ui
import { PositionedFlex } from '../../ui';
// /////////////////////////////////////////////////////////////////////////////////////////////////

export const BoxComponent = (props) => (
  <PositionedFlex
    bg={props.bg}
    top={props.top}
    m={props.margin}
    left={props.left}
    p={props.padding}
    right={props.right}
    width={props.width}
    button={props.button}
    height={props.height}
    maxWidth={props.maxWidth}
    minWidth={props.minWidth}
    position={props.position}
    boxShadow={props.boxShadow}
    alignItems={props.alignItems}
    borderRadius={props.borderRadius}
    flexDirection={props.flexDirection}
    justifyContent={props.justifyContent}
  >
    {props.children}
  </PositionedFlex>
);

export default BoxComponent;
