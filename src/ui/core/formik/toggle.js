import RToggle from 'react-toggle';
import styled from 'styled-components';
import { space } from 'styled-system';
import 'react-toggle/style.css';
// /////////////////////////////////////////////////////////////////////////////////////////////////

export const Toggle = styled(RToggle)`
  ${space}
  & .react-toggle-track {
    border-radius: 17px;
    height: 17px;
    width: 36px;
    border: 1px solid black;
    background-color: white;
  }
  & .react-toggle-thumb {
    height: 17px;
    left: 0;
    top: 0;
    width: 17px;
    background-color: green;
  }
  & .react-toggle-track-check {
    left: 4px;
  }
  &.react-toggle.react-toggle--checked .react-toggle-track {
    background-color: lightgreen;
  }
  &.react-toggle > div.react-toggle-thumb {
    border-color: black;
  }
  &.react-toggle.react-toggle--checked > div.react-toggle-thumb {
    left: 20px;
    border-color: blue;
  }
  &.react-toggle--focus .react-toggle-thumb {
    box-shadow: 0 0 0 0;
  }
  &.react-toggle:active:not(.react-toggle--disabled) .react-toggle-thumb {
    -webkit-box-shadow: 0 0 0 0;
    -moz-box-shadow: 0 0 0 0;
    box-shadow: 0 0 0 0;
  }
  &.react-toggle:hover:not(.react-toggle--disabled) .react-toggle-track {
    background-color: blue;
  }
  &.react-toggle--checked:hover:not(.react-toggle--disabled) .react-toggle-track {
    background-color: gray;
  }
  & path {
    fill: white;
  }
`;
