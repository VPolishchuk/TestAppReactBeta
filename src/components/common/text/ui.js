import * as R from 'ramda';
import styled from 'styled-components';
import { width, space, color, fontSize } from 'styled-system';
// global
import * as G from '../../../global/helpers';
///////////////////////////////////////////////////////////////////////////////////////////////////

export const Text = styled.div`
  ${space}
  ${width}
  ${color}
  ${fontSize}
  border: ${({ border }) => border};
  cursor: ${({ cursor }) => cursor};
  border-top: ${({ borderTop }) => borderTop};
  border-left: ${({ borderLeft }) => borderLeft};
  border-right: ${({ borderRight }) => borderRight};
  border-radius: ${({ borderRadius }) => borderRadius};
  border-bottom: ${({ borderBottom }) => borderBottom};
  display: ${({ display }) => R.or(display, 'inline')};
  overflow: ${({ overflow }) => R.or(overflow, 'hidden')};
  max-width: ${({ maxWidth }) => R.or(maxWidth, 'unset')};
  min-width: ${({ minWidth }) => R.or(minWidth, 'unset')};
  word-break: ${({ wordBreak }) => R.or(wordBreak, 'unset')};
  text-align: ${({ textAlign }) => R.or(textAlign, 'unset')};
  font-weight: ${({ fontWeight }) => R.or(fontWeight, 'unset')};
  white-space: ${({ whiteSpace }) => R.or(whiteSpace, 'nowrap')};
  text-transform: ${({ textTransform }) => R.or(textTransform, 'unset')};
  text-decoration: ${({ textDecoration }) => R.or(textDecoration, 'unset')}}
  text-overflow: ${({ withEllipsis }) => G.ifElse(
    G.isTrue(withEllipsis),
    'ellipsis',
    'clip',
  )}
`;
