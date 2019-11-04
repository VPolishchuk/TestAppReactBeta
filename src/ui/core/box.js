import * as R from 'ramda';
import styled, { css } from 'styled-components';
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
//////////////////////////////////////////////////////////////////////////////

export const setBorder = ({
  border,
  borderX,
  borderY,
  borderTop,
  borderLeft,
  borderRight,
  borderColor,
  borderBottom }) => {
  return css`
    border-top: ${R.or(border, R.or(borderY, borderTop))} ${borderColor};
    border-left: ${R.or(border, R.or(borderX, borderLeft))} ${borderColor};
    border-right: ${R.or(border, R.or(borderX, borderRight))} ${borderColor};
    border-bottom: ${R.or(border, R.or(borderY, borderBottom))} ${borderColor};
  `;
};

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
  ${setBorder}
`;

export const A = Abstract('a');
export const H1 = Abstract('h1');
export const H2 = Abstract('h2');
export const H3 = Abstract('h3');
export const Text = Abstract('p');
export const Box = Abstract('div');
export const Span = Abstract('span');
export const Main = Abstract('main');
export const Section = Abstract('section');

export const FlexBox = styled(Box)`
  ${flexWrap}
  ${alignSelf}
  ${alignItems}
  ${justifySelf}
  ${flexDirection}
  ${justifyContent}
  display: ${({ display }) => R.or(display, 'flex')};
`;

export const PositionedBox = styled(Box)`
  ${top}
  ${left}
  ${right}
  ${bottom}
  ${position}
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

export const Grid = styled(Box)`
  ${gridGap}
  ${gridRow}
  ${gridColumn}
  ${gridAutoRows}
  ${gridAutoColumns}
  ${gridTemplateRows}
  ${gridTemplateColumns}
  display: ${({ display }) => R.or(display, 'grid')};
`;

export const PositionedGrid = styled(Grid)`
  ${top}
  ${left}
  ${right}
  ${bottom}
  ${position}
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

export const Image = styled.img`
  ${color}
  ${width}
  ${height}
  ${maxWidth}
  ${minWidth}
  ${maxHeight}
  ${minHeight}
  object-fit: ${({ objectFit }) => objectFit};
  border-radius: ${({ borderRadius }) => borderRadius};
`;

export const PositionedImage = styled(Image)`
  ${top}
  ${left}
  ${right}
  ${bottom}
  ${position}
`;

export const navMenuHober = css`
  :hover {
    color: #327FF2;
    border-radius: 1px;
    border-bottom: 3px solid #327FF2;
  }
`;

export const tableScrollBarStyle = css`
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #327FF2;
  }
`;

export const tableScrollBarStyleModal = css`
  ::-webkit-scrollbar {
    width: 0em;
  }
`;

export const hideDafaultCheckBox = css`
  & input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  & > checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    border-radius: 15px;
    background-color: #eee;
  }
  &:hover input ~ .checkmark {
    background-color: #ccc;
  }
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