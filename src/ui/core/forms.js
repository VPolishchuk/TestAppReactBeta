import React from 'react';
import * as R from 'ramda';
import styled, { css } from 'styled-components';
import {
  top,
  left,
  flex,
  size,
  color,
  space,
  order,
  width,
  right,
  height,
  bottom,
  border,
  zIndex,
  opacity,
  display,
  position,
  fontSize,
  flexWrap,
  overflow,
  maxWidth,
  minWidth,
  maxHeight,
  minHeight,
  alignSelf,
  textAlign,
  boxShadow,
  borderTop,
  fontFamily,
  background,
  alignItems,
  justifySelf,
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
// helpers
import * as H from '../../global/helpers';
// /////////////////////////////////////////////////////////////////////////////////////////////////

export const Form = styled('form')`
  ${top}
  ${flex}
  ${size}
  ${left}
  ${right}
  ${color}
  ${space}
  ${width}
  ${order}
  ${height}
  ${border}
  ${zIndex}
  ${bottom}
  ${opacity}
  ${display}
  ${flexWrap}
  ${fontSize}
  ${overflow}
  ${maxWidth}
  ${minWidth}
  ${position}
  ${textAlign}
  ${maxHeight}
  ${minHeight}
  ${boxShadow}
  ${borderTop}
  ${alignItems}
  ${background}
  ${fontWeight}
  ${fontFamily}
  ${lineHeight}
  ${borderLeft}
  ${borderRight}
  ${borderColor}
  ${borderBottom}
  ${borderRadius}
  ${flexDirection}
  ${backgroundSize}
  ${justifyContent}
  ${backgroundImage}
  transform: ${({ transform }) => transform};
  transition: ${({ transition }) => transition};
  border-style: ${({ borderStyle }) => borderStyle};
  cursor: ${({ cursor }) => R.or(cursor, 'initial')};
  text-transform: ${({ textTransform }) => textTransform};
  border-top-left-radius: ${({ borderTLRadius }) => borderTLRadius};
  border-top-right-radius: ${({ borderTRRadius }) => borderTRRadius};
  border-bottom-left-radius: ${({ borderBLRadius }) => borderBLRadius};
  border-bottom-right-radius: ${({ borderBRRadius }) => borderBRRadius};
  ${({ additionalStyles }) => additionalStyles};
`;

export const Label = styled('label')`
  ${top}
  ${flex}
  ${size}
  ${left}
  ${right}
  ${color}
  ${space}
  ${width}
  ${order}
  ${height}
  ${border}
  ${zIndex}
  ${bottom}
  ${opacity}
  ${display}
  ${flexWrap}
  ${fontSize}
  ${flexWrap}
  ${top}
  ${left}
  ${right}
  ${bottom}
  ${position}
  ${alignSelf}
  ${alignItems}
  ${justifySelf}
  ${flexDirection}
  ${justifyContent}
  ${overflow}
  ${maxWidth}
  ${minWidth}
  ${position}
  ${textAlign}
  ${maxHeight}
  ${minHeight}
  ${boxShadow}
  ${borderTop}
  ${alignItems}
  ${background}
  ${fontWeight}
  ${fontFamily}
  ${lineHeight}
  ${borderLeft}
  ${borderRight}
  ${borderColor}
  ${borderBottom}
  ${borderRadius}
  ${flexDirection}
  ${backgroundSize}
  ${justifyContent}
  ${backgroundImage}
  transform: ${({ transform }) => transform};
  transition: ${({ transition }) => transition};
  border-style: ${({ borderStyle }) => borderStyle};
  cursor: ${({ cursor }) => R.or(cursor, 'initial')};
  text-transform: ${({ textTransform }) => textTransform};
  border-top-left-radius: ${({ borderTLRadius }) => borderTLRadius};
  border-top-right-radius: ${({ borderTRRadius }) => borderTRRadius};
  border-bottom-left-radius: ${({ borderBLRadius }) => borderBLRadius};
  border-bottom-right-radius: ${({ borderBRRadius }) => borderBRRadius};
  ${({ additionalStyles }) => additionalStyles};
`;

export const animateFieldAutoComplate = css`
  z-index: 9;
  opacity: 1;
  transform: translateY(40px);
  transition: transform 0.5s ease, opacity 0.7s linear;
`;

export const InfoWrapper = styled.div`
  align-items: center;
  display: inline-flex;
  position: relative;
  z-index: 11;
  & .info-icon {
    width: 16px;
    height: 16px;
    min-width: 16px;
    text-align: center;
    border-radius: 50%;
    color: red;
    border: 1px solid lightgray;
    &:hover {
      background-color: red;
      color: black;
    }
  }
  & .info-text {
    display: none;
    width: max-content;
    max-width: 400px;
    padding: 5px;
    margin: 0 5px;
    box-shadow: 0 0 2px 2px gray;
    border-radius: 2px;
    background-color: white;
    font-size: 12px;
    word-break: break-word;
    position: absolute;
    left: 16px;
  }
  & .info-icon:hover + .info-text {
    display: inline-flex;
  }
`;

export const Info = ({ text }) => (
  <InfoWrapper>
    <div className='info-icon'>i</div>
    <div className='info-text'>{text}</div>
  </InfoWrapper>
);

export const Error = styled('span')`
  ${space}
  ${fontSize}
  color: red;
  width: max-content;
  top: ${({ errorTop }) => errorTop};
  left: ${({ errorLeft }) => errorLeft};
  z-index: ${({ zIndex }) => R.or(zIndex, 'unset')};
  position: ${({ errorPosition }) => errorPosition};
`;

export const Textarea = styled.textarea`
  ${space};
  cursor: text;
  resize: none;
  outline: none;
  font-size: 13px;
  padding: 5px 15px;
  line-height: 24px;
  height: ${({ height }) => R.or(height, '100px')};
  border-style: ${({ borderStyle }) => borderStyle};
  border-radius: ${({ borderRadius }) => borderRadius};
  text-transform: ${({ textTransform }) => textTransform};
  border-top-left-radius: ${({ borderTLRadius }) => borderTLRadius};
  border-top-right-radius: ${({ borderTRRadius }) => borderTRRadius};
  border-bottom-right-radius: ${({ borderBRRadius }) => borderBRRadius};
  border-bottom-left-radius: ${({ borderBLRadius }) => borderBLRadius};
  border: ${({ inputBorder }) => R.or(inputBorder, '1px solid lightgray')};
  background-color: ${({ inputBackgroundColor }) => R.or(inputBackgroundColor, '#fff')};
  width: ${({ width }) => (
    H.ifElse(H.isNotNil(width), width, '540px')
  )};
  &:focus {
    box-shadow: 0 0 5px 0 rgba(206, 40, 40, 0.5);
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

export const SelectWrapper = styled.div`
  ${width}
  position: relative;
  &:after {
    width: 6px;
    content: '';
    height: 6px;
    z-index: 10;
    position: absolute;
    border: solid black;
    pointer-events: none;
    border-width: 0px 1px 1px 0;
    transform: rotate(45deg) translate(0, -60%);
    top: ${({ afterTop }) => R.or(afterTop, '18px')};
    right: ${({ afterRight }) => R.or(afterRight, '25px')};
  }
`;

export const Option = styled.option``;

export const renderOptions = (options) => {
  if (R.isNil(options)) return;
  if (R.not(Array.isArray(options))) {
    const defaultOptions = [<Option key={1} value='' />];
    R.forEachObjIndexed((obj) => (
      defaultOptions.push(
        <Option key={obj.guid} value={obj.guid}>{obj.displayValue}</Option>,
      )
    ), options);
    return defaultOptions;
  }
  return options.map((option, index) => {
    if (R.is(String, option)) {
      return <Option key={index} value={option}>{option}</Option>;
    }
    return (
      <Option
        key={index}
        disabled={option.disabled}
        value={R.or(option.guid, option.value)}
      >
        {R.or(option.name, option.label)}
      </Option>
    );
  });
};
