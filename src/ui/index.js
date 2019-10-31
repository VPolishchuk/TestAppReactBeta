import * as R from 'ramda';
import styled, { css, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
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
  gridGap,
  opacity,
  gridRow,
  display,
  position,
  fontSize,
  flexWrap,
  overflow,
  maxWidth,
  minWidth,
  maxHeight,
  minHeight,
  fontStyle,
  alignSelf,
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
  gridColumn,
  justifySelf,
  borderRight,
  borderBottom,
  borderRadius,
  gridAutoRows,
  letterSpacing,
  flexDirection,
  justifyContent,
  backgroundSize,
  backgroundImage,
  gridAutoColumns,
  gridTemplateRows,
  gridTemplateColumns } from 'styled-system';
////////////////////////////////////////////////


export const Abstract = (tag) => styled(tag)`
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
  ${fontStyle}
  ${textAlign}
  ${maxHeight}
  ${minHeight}
  ${boxShadow}
  ${borderTop}
  ${background}
  ${fontWeight}
  ${fontFamily}
  ${lineHeight}
  ${borderLeft}
  ${borderRight}
  ${borderColor}
  ${borderBottom}
  ${borderRadius}
  ${letterSpacing}
  ${backgroundSize}
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

export const Box = Abstract('div');
export const Text = Abstract('p');

export const FlexBox = styled(Box)`
  ${flexWrap}
  ${alignSelf}
  ${alignItems}
  ${justifySelf}
  ${flexDirection}
  ${justifyContent}
  display: ${({ display }) => R.or(display, 'flex')};
`;

export const PositionedFlex = styled(FlexBox)`
  ${top}
  ${left}
  ${right}
  ${bottom}
  ${position}
  ${alignSelf}
  ${justifySelf}
`;

export const RootWrapper = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  height: max-content
`;

export const Button = styled.button`
  ${color}
  ${space}
  ${width}
  ${height}
  ${border}
  ${zIndex}
  ${opacity}
  ${fontSize}
  ${flexWrap}
  ${alignSelf}
  ${boxShadow}
  ${alignSelf}
  ${fontWeight}
  ${fontFamily}
  ${background}
  ${alignItems}
  ${justifySelf}
  ${borderRadius}
  ${flexDirection}
  ${justifyContent}
  display: ${({ display }) => R.or(display, 'flex')};
  cursor: ${({ cursor }) => R.or(cursor, 'initial')};
  text-transform: ${({ textTransform }) => textTransform};
  border-top-left-radius: ${({ borderTLR }) => borderTLR};
  border-top-right-radius: ${({ borderTRR }) => borderTRR};
  text-decoration: ${({ textDecoration }) => textDecoration};
  border-bottom-left-radius: ${({ borderBLR }) => borderBLR};
  border-bottom-right-radius: ${({ borderBRR }) => borderBRR};
  ${({ additionalStyles }) => additionalStyles}
  &:hover {
    box-shadow: 0px 1px 7px 0px #3a7fe6;
  }
`;

export const LinkTo = styled(Link)`
  ${color}
  ${space}
  ${width}
  ${height}
  ${fontSize}
  ${fontWeight}
  text-decoration: initial;
  &:focus {
    outline: none;
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

export const pulse = css`
  &:hover {
    width: 65px;
    height: 65px;
    font-size: 30px;
    font-weight: boud;
  }
`;