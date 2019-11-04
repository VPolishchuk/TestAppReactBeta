import React from 'react';
import * as R from 'ramda';
import { CountryDropdown } from 'react-country-region-selector';
// ui formiks
import { CountrySelectWrapper } from './ui';
///////////////////////////////////////////////////////////////////////////////////////////////////

class CountryDropdownSelect extends React.Component {
  handleChange(value) {
    const { id, setFieldValue } = this.props;
    setFieldValue(id, value);
  };

  handleBlur() {
    const { id, setFieldTouched } = this.props;
    setFieldTouched(id, true);
  };

  render() {
    return (
      <CountrySelectWrapper width={this.props.width}>
        <CountryDropdown
          id={this.props.id}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          value={R.or(this.props.value, '')} />
      </CountrySelectWrapper>
    );
  }
}

export default CountryDropdownSelect;
