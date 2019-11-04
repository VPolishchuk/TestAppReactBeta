import React from 'react';
// ui
import {
  Icon,
  HiddenCheckbox,
  StyledCheckbox,
  CheckboxContainer } from './ui';
////////////////////////////////////////////////////

export const Checkbox = ({ className, checked, ...props }) => (
  <CheckboxContainer {...props} className={className}>
    <HiddenCheckbox checked={checked} {...props} />
    <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
);

export default Checkbox;
