import * as R from 'ramda';
import Select from 'react-select';
import styled, { css } from 'styled-components';
import {
  flex,
  size,
  color,
  space,
  order,
  width,
  height,
  border,
  zIndex,
  opacity,
  display,
  fontSize,
  flexWrap,
  overflow,
  maxWidth,
  minWidth,
  maxHeight,
  minHeight,
  textAlign,
  boxShadow,
  borderTop,
  fontFamily,
  background,
  alignItems,
  lineHeight,
  fontWeight,
  borderLeft,
  borderColor,
  borderRight,
  borderBottom,
  borderRadius,
  flexDirection,
  justifyContent,
  backgroundSize,
  backgroundImage } from 'styled-system';
// /////////////////////////////////////////////////////////////////////////////////////////////////

export const hoverDeleteDoc = css`
  & span:hover {
    zIndex: 2;
  }
`;
// REFACTOR: all z-indexes and common UI with core

export const renderBorderColor = ({ hasError }) => {
  if (hasError === true) {
    return '#c23e37';
  }
  return '#d4d6da';
};

export const FormWrapper = styled('section')``;

export const SwitchDriversWrapper = styled('section')`
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

export const FormSection = styled('section')`
  ${space}
  display: flex;
  flex-wrap: wrap;
  position: static;
  z-index: ${({ zIndex }) => R.or(zIndex, 'initial')};
  flex-direction: ${({ flexDirection }) => R.or(flexDirection, 'row')};
`;

export const Fieldset = styled('section')`
  ${flex}
  ${size}
  ${color}
  ${space}
  ${width}
  ${order}
  ${height}
  ${border}
  ${zIndex}
  ${opacity}
  ${display}
  ${fontSize}
  ${overflow}
  ${maxWidth}
  ${minWidth}
  ${flexWrap}
  ${textAlign}
  ${maxHeight}
  ${minHeight}
  ${boxShadow}
  ${borderTop}
  ${background}
  ${fontWeight}
  ${fontFamily}
  ${lineHeight}
  ${alignItems}
  ${borderLeft}
  ${borderRight}
  ${borderColor}
  ${borderBottom}
  ${borderRadius}
  ${flexDirection}
  ${backgroundSize}
  ${justifyContent}
  ${backgroundImage}
  box-shadow: ${({ shadow }) => R.or(shadow, 'unset')};
  flex-grow: 1;
  outline: none;
`;

export const Form = styled('form')`
  ${flex}
  ${size}
  ${color}
  ${space}
  ${width}
  ${order}
  ${height}
  ${border}
  ${zIndex}
  ${opacity}
  ${display}
  ${fontSize}
  ${overflow}
  ${maxWidth}
  ${minWidth}
  ${flexWrap}
  ${textAlign}
  ${maxHeight}
  ${minHeight}
  ${boxShadow}
  ${borderTop}
  ${background}
  ${fontWeight}
  ${fontFamily}
  ${lineHeight}
  ${alignItems}
  ${borderLeft}
  ${borderRight}
  ${borderColor}
  ${borderBottom}
  ${borderRadius}
  ${flexDirection}
  ${backgroundSize}
  ${justifyContent}
  ${backgroundImage}
  transition: ${({ transition }) => transition};
  visibility: ${({ visibility }) => R.or(visibility, 'unset')};
`;

export const FieldsGroup = styled('div')`
  ${space}
  ${width}
  ${height}
  display: flex;
  position: static;
  z-index: ${({ zIndex }) => R.or(zIndex, 'initial')};
  flex-wrap: ${({ flexWrap }) => R.or(flexWrap, 'wrap')};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => R.or(alignItems, 'flex-start')};
  flex-direction: ${({ flexDirection }) => R.or(flexDirection, 'row')};
`;

export const InputsWrapper = styled('div')`
  ${space}
  ${maxWidth}
  ${minWidth}
  display: flex;
  flex-wrap: wrap;
  position: relative;
  width: ${({ width }) => R.or(width, 'auto')};
  justify-content: ${({ jc }) => R.or(jc, 'initial')};
  max-width: ${({ maxWidth }) => R.or(maxWidth, 'auto')};
  align-items: ${({ alignItems }) => R.or(alignItems, 'center')};
  flex-direction: ${({ flexDirection }) => R.or(flexDirection, 'row')};
`;

export const InputSelect = styled('select')`
  ${space}
  ${width}
  height: 40px;
  outline: none;
  appearance: none;
  line-height: 30px;
  position: relative;
  background-color: white;
  border-radius: ${({ borderRadius }) => R.or(borderRadius, '2px')};
  border-top-left-radius: ${({ borderTLRadius }) => borderTLRadius};
  border-top-right-radius: ${({ borderTRRadius }) => borderTRRadius};
  border-bottom-left-radius: ${({ borderBLRadius }) => borderBLRadius};
  border-bottom-right-radius: ${({ bordeBRrRadius }) => bordeBRrRadius};
  border: ${({ inputBorder }) => R.or(inputBorder, '1px solid lightgray')};
  &:focus {
    box-shadow: 0 0 5px 0 rgba(206, 40, 40, 0.5);
  }
`;

export const ReactSelectWrapper = styled('div')`
  ${width}
  ${zIndex}
`;

export const StyledReactSelect = styled(Select)`
  ${space}
  ${width}
  min-width: ${({ minWidth }) => minWidth};
  & .Select-control {
    height: 40px;
    border-radius: 2px;
    border: 1px solid lightgray;
  }
  & .Select-multi-value-wrapper {
    display: block;
    height: max-content;
  }
  & .Select-control .Select-multi-value-wrapper .Select-value {
    line-height: 0.9;
  }
  &.Select--single .Select-value {
    display: flex;
    align-items: center;
  }
  &.Select--multi .Select-value {
    display: flex;
    align-items: center;
  }
  &.Select--multi .Select-value-label {
    word-break: break-word;
    width: calc(100% - 20px);
  }
  & .Select-placeholder, .Select--single > .Select-control .Select-value {
    line-height: 28px;
    top: 0 !important;
  }
  & .Select-input {
    max-height: 40px !important;
  }
  & .Select-input > input {
    max-height: 40px;
    box-sizing: border-box !important;
  }
`;

export const PlacesAutocompleteWrapper = styled('div')`
  ${space}
  ${width}
  .search-autocomplete-container {
    z-index: 10;
    border-radius: 3px;
    position: absolute;
    border: 1px solid ${(props) => renderBorderColor(props)};
  }
  & > div > input {
    height: 40px;
    outline: none;
    appearance: none;
    line-height: 30px;
    background-color: white;
    border: ${({ border }) => R.or(border, '1px solid lightgray')};
    border-radius: ${({ borderRadius }) => R.or(borderRadius, '2px')};
    border-top-left-radius: ${({ borderTLRadius }) => borderTLRadius};
    border-top-right-radius: ${({ borderTRRadius }) => borderTRRadius};
    border-bottom-left-radius: ${({ borderBLRadius }) => borderBLRadius};
    border-bottom-right-radius: ${({ bordeBRrRadius }) => bordeBRrRadius};
    &:focus {
      box-shadow: 0 0 5px 0 rgba(206, 40, 40, 0.5);
    }
  }
`;

export const CountrySelectWrapper = styled.section`
  ${width}
  ${space}
  height: 40px;
  display: flex;
  position: relative;
  z-index: ${({ zi }) => zi};
  & > select {
    z-index: 0;
    width: 100%;
    height: 40px;
    outline: none;
    appearance: none;
    line-height: 30px;
    border-radius: 2px;
    padding-left: 15px;
    position: relative;
    padding-right: 25px;
    background-color: white;
    border: 1px solid lightgray;
    &:focus {
      box-shadow: 0 0 5px 0 rgba(206, 40, 40, 0.5);
    }
  }
  &:after {
    top: 15px;
    width: 6px;
    content: '';
    height: 6px;
    right: 15px;
    position: absolute;
    border: solid black;
    pointer-events: none;
    border-width: 0px 1px 1px 0;
    transform: rotate(45deg) translate(0, -60%);
  }
`;

export const CalendarWrapper = styled('div')`
  & > div {
    z-index: 12;
  }
  & .react-datepicker-popper[data-placement^="top"] {
    margin-left: 10px;
  }
  & .react-datepicker-popper[data-placement^="bottom"] {
    margin-top: 5;
    margin-left: 3;
  }
  & .react-datepicker__triangle {
    display: none;
  }
  & .react-datepicker__navigation {
    z-index: 11;
  }
  & .react-datepicker__navigation--previous {
    border-right-color: lightgray;
  }
  & .react-datepicker__navigation--next {
    border-left-color: lightgray;
  }
  & .react-datepicker__day--selected {
    background-color: lightgray;
    &:hover {
      background-color: white;
    }
  }
  & .react-datepicker {
    box-shadow: 0 0 1px 1px lightgray;
  }
  & .react-datepicker__header--time {
    padding-top: 18px;
    padding-bottom: 18px;
  }
  & .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list {
      padding: 0;
      height: 183px;
      & li.react-datepicker__time-list-item {
        padding: 5px 6px;
      }
      & li.react-datepicker__time-list-item--selected {
        background-color: white;
      &:hover {
        background-color: white;
        }
      }
    }
`;

export const Input = styled.input`
  ${space}
  ${width}
  ${opacity}
  ${fontSize}
  cursor: text;
  outline: none;
  padding: ${({ p }) => R.or(p, '0 0 0 15px')};
  z-index: ${({ zIndex }) => R.or(zIndex, '2')};
  height: ${({ height }) => R.or(height, '40px')};
  color: ${({ inputColor }) => R.or(inputColor, '#000')};
  text-align: ${({ textAlign }) => R.and(textAlign, 'center')};
  line-height: ${({ lineHeight }) => R.or(lineHeight, '30px')};
  border-radius: ${({ borderRadius }) => R.or(borderRadius, '2px')};
  border: ${({ inputBorder }) => R.or(inputBorder, '1px solid lightgray')};
  background-image: ${({ inputBackgroundImage }) => R.or(inputBackgroundImage, 'none')};
  background-color: ${({ inputBackgroundColor }) => R.or(inputBackgroundColor, 'lightgray')};
  &:focus {
    border: 1px solid #327FF2;
    box-shadow: 0 0 5px 0 rgb(20, 50, 95);
  }
  &:input[type="text"]:focus ~ label {
    -moz-transform: translate(0, -35px);
    -ms-transform: translate(0, -35px);
    -webkit-transform: translate(0, -35px);
    transform: translate(0, -35px);
  }
  ::-webkit-input-placeholder {
    color: ${({ inputPlaceholderColor }) => R.or(inputPlaceholderColor, '#000')};
  }
  ::-moz-placeholder {
    color: ${({ inputPlaceholderColor }) => R.or(inputPlaceholderColor, '#000')};
  }
  :-ms-input-placeholder {
    color: ${({ inputPlaceholderColor }) => R.or(inputPlaceholderColor, '#000')};

  }
  :-moz-placeholder {
    color: ${({ inputPlaceholderColor }) => R.or(inputPlaceholderColor, '#000')};
  }
`;

export const Label = styled.label`
  ${space}
  ${width}
  ${fontSize}
  ${fontWeight}
  display: flex;
  min-width: ${({ minWidth }) => minWidth};
  color: ${({ color }) => R.or(color, 'grey')};
  &.required::after {
    content: '*';
    color: red;
  }
`;

// style for checkbox
export const CheckboxContainer = styled.div`
  display: flex;
  height: '100%';
  cursor: pointer;
  position: absolute;
  align-items: center;
  top: ${({ top }) => top };
  justify-content: flex-start;
  left: ${({ left }) => left };
  right: ${({ right }) => right };
  bottom: ${({ bottom }) => bottom };
`

export const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const StyledCheckbox = styled.div`
  display: block;
  margin-right: 15px;
  top: 0;
  left: 0;
  width: 25px;
  height: 25px;
  border-radius: 15px;
  transition: all 150ms;
  background: ${({ checked }) => (checked ? '#2196F3' : 'transparent')}
  border: ${({ checked }) => (checked ? '1px solid #2196F3' : '1px solid #ccc')}

  ${HiddenCheckbox}:hover + & {
    box-shadow: 0 0 0 3px #2196F3;
  }

  ${Icon} {
    visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')}
  }
`;

// input style type=file
export const FileInput = styled.input.attrs({ type: 'file' })`
  ${space}
  ${width}
  ${height}
  right: 0;
  border: 0;
  bottom: 0;
  padding: 0;
  opacity: 0;
  z-index: 10px;
  cursor: pointer;
  position: absolute;
  clippath: inset(50%);
  white-space: nowrap;
`;

export const pulse = css`
  &:hover {
    width: 65px;
    height: 65px;
    font-size: 30px;
    font-weight: boud;
  }
`;