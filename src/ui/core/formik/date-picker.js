import * as R from 'ramda';
import styled from 'styled-components';
import RDatePicker from 'react-datepicker';
import {
  width,
  space,
  flexWrap,
  alignSelf,
  alignItems,
  justifySelf,
  flexDirection,
  justifyContent,
} from 'styled-system';
// import 'react-datepicker/dist/react-datepicker.css';
// /////////////////////////////////////////////////////////////////////////////////////////////////

const FormGroup = styled.div`
  display: flex;
  min-height: 30px;
  align-items: ${({ align }) => R.or(align, 'center')};
  flex-direction: ${({ direction }) => R.or(direction, 'column')};
`;

export const DatePicker = styled(RDatePicker)`
  ${space}
  ${width}
  cursor: text;
  height: 40px;
  outline: none;
  font-size: 10px;
  line-height: 30px;
  padding-left: 15px;
  border-radius: 10px;
  box-sizing: border-box;
  border: 1px solid #DBDCE6;
  font-family: HelveticaNeue;
  width: ${({ width }) => R.or(width, '100%')};
  background-color: ${({ bgColor }) => R.or(bgColor, '#DBDCE6')};
  &:focus {
    box-shadow: 0 0 5px 0 rgba(206, 40, 40, 0.5);
  }
  & .react-datepicker-wrapper {
    width: 100%;
  }
`;

export const CalendarFormGroup = styled(FormGroup)`
  ${width}
  ${space}
  ${flexWrap}
  ${alignSelf}
  ${alignItems}
  ${justifySelf}
  ${flexDirection}
  ${justifyContent}
  z-index: ${({ active }) => R.and(active, '20')};
  position: ${({ active }) => R.and(active, 'relative')};
  & > div {
    width: 100%;
    & > div {
      width: 100%;
    }
  }
  & .react-datepicker__input-container {
    padding: 0 5px;
  }
  & .react-datepicker-popper {
    width: auto;
    z-index: 12;
  }

  & .react-datepicker-popper[data-placement^="top"] {
    margin-left: 10px;
  }
  & .react-datepicker-popper[data-placement^="bottom"] {
    margin-top: 0;
  }
  & .react-datepicker__triangle {
    display: none;
  }
  & .react-datepicker__navigation {
    z-index: 11;
  }
  & .react-datepicker__navigation--previous {
    border-right-color: ${({ borderColor }) => R.or(borderColor, 'red')};
  }
  & .react-datepicker__navigation--next {
    border-left-color: ${({ borderColor }) => R.or(borderColor, 'red')};
  }
  & .react-datepicker__day--selected {
    background-color: ${({ borderColor }) => R.or(borderColor, 'red')};
    &:hover {
      background-color: ${({ hoverColor }) => R.or(hoverColor, 'green')};
    }
  }
  & .react-datepicker {
    box-shadow: 0 0 1px 1px ${({ boxShadow }) => R.or(boxShadow, 'blue')};
  }
  & .react-datepicker__header--time {
    padding-top: 18px;
    padding-bottom: 18px;
  }
  & .react-datepicker__time-container {
    width: 72px;
    right: -74px;
    display: none;
  }
  & .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list {
      padding: 0;
      height: 183px !important;
      & li.react-datepicker__time-list-item {
        padding: 5px 6px;
      }
      & li.react-datepicker__time-list-item--selected {
        background-color: ${({ datePickerColor }) => R.or(datePickerColor, 'green')};
      &:hover {
        background-color: ${({ datePickerHoverColor }) => R.or(datePickerHoverColor, 'blue')};
        }
      }
    }
    & .react-datepicker__close-icon::after {
      right: 15px;
    }
`;
