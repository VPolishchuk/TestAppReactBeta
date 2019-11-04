import styled, { keyframes } from 'styled-components';
////////////////////////////////////////////////////////

const ellipsis1 = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const ellipsis2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
`;

const ellipsis3 = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

export const LoaderWrap = styled.div`
  width: 64px;
  height: 64px;
  position: relative;
  display: inline-block;
  & > div {
    position: absolute;
    top: 27px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  & > div:nth-child(1) {
    left: 6px;
    animation: ${ellipsis1} 0.6s infinite;
  }
  & > div:nth-child(2) {
    left: 6px;
    animation: ${ellipsis2} 0.6s infinite;
  }
  & > div:nth-child(3) {
    left: 26px;
    animation: ${ellipsis2} 0.6s infinite;
  }
  & > div:nth-child(4) {
    left: 45px;
    animation: ${ellipsis3} 0.6s infinite;
  }
`;
