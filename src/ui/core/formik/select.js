import * as R from 'ramda';
import React from 'react';
// global
import * as H from '../../../global/helpers';
// components formiks
import { StyledReactSelect } from './ui';
// /////////////////////////////////////////////////////////////////////////////////////////////////

class SelectInput extends React.Component {
  handleChange = (value) => {
    const inputValue = H.ifElse(
      R.isNil(value),
      {
        label: null,
        value: null,
      },
      value,
    );
    const { id, isMulti, setFieldValue, shouldHandle, handlers } = this.props;
    const handleChangeSelect = R.path(['handleChangeSelect'], handlers);
    if (H.isTrue(isMulti)) {
      const data = R.map((item) => item, inputValue);
      setFieldValue(id, data);
    } else {
      setFieldValue(id, inputValue);
    }
    if (R.and(H.isTrue(shouldHandle), R.is(Function, handleChangeSelect))) {
      if (H.isTrue(isMulti)) {
        const data = R.map((item) => R.prop('value', item), inputValue);
        handleChangeSelect(id, data);
      } else {
        handleChangeSelect(id, R.prop('value', inputValue));
      }
    }
    if (H.isFalse(this.props.closeMenuOnSelect)) {
      this.select.setState({ isOpen: true });
    }
  };

  
  // handleBlur = () => {
  //   const { id, setFieldTouched } = this.props;
  //   setFieldTouched(id, true);
  // };
  render () {
    const defaultStyles = {
      borderRadius: '10px',
    }
    const colourStyles = {
      control: styles => ({
        ...styles,
        ...defaultStyles,
        backgroundColor: '#DBDCE6' }),
      // option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      //   const color = 'red';
      //   return {
      //     ...styles,
      //     backgroundColor: isDisabled
      //       ? null
      //       : isSelected
      //       ? data.color
      //       : isFocused
      //       ? color.alpha(0.1).css()
      //       : null,
      //     color: isDisabled
      //       ? '#ccc'
      //       : isSelected
      //       ? chroma.contrast(color, 'white') > 2
      //         ? 'white'
      //         : 'black'
      //       : data.color,
      //     cursor: isDisabled ? 'not-allowed' : 'default',
      //     ':active': {
      //       ...styles[':active'],
      //       backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      //     },
      //   };
      // },
      multiValue: (styles) => ({
        ...styles,
        color: '#fff',
        padding: '3px',
        borderRadius: '10px',
        backgroundColor: '#327FF2',
      }),
      multiValueLabel: (styles) => ({
        ...styles,
        color: '#fff',
        padding: '3px',
        borderRadius: '10px',
        backgroundColor: '#327FF2',
      }),
      // multiValueRemove: (styles, { data }) => ({
      //   ...styles,
      //   color: data.color,
      //   ':hover': {
      //     backgroundColor: data.color,
      //     color: 'white',
      //   },
      // }),
    };
    return (
      <StyledReactSelect
        id={this.props.id}
        styles={colourStyles}
        value={this.props.value}
        onBlur={this.handleBlur}
        onKeyDown={this.onKeyDown}
        isMulti={this.props.isMulti}
        options={this.props.options}
        onChange={this.handleChange}
        innerRef={(select) => { this.select = select }} />
    );
  }
}

export default SelectInput;
