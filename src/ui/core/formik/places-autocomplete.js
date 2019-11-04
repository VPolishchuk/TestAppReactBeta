import React from 'react';
import * as R from 'ramda';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
// global
import * as G from '../../../global/helpers';
// component formiks
import { PlacesAutocompleteWrapper } from './ui';
// /////////////////////////////////////////////////////////////////////////////////////////////////

export const getSpecificLocationValue = (
  data,
  type,
  insuranceType,
) => {
  const addressComponent = R.find(
    (location) => (
      G.isNotNil(
        R.find(
          (addressType) => (
            R.or(R.equals(type, addressType), R.equals(insuranceType, addressType))
          ),
          location.types,
        ))),
    data,
  );
  return G.getOrElse(addressComponent, 'long_name', '');
};

class PlacesAutocompleteInput extends React.Component {

  handleChange(value) {
    const { id, setFieldValue } = this.props;
    setFieldValue(id, value);
  };
  handleBlur() {
    const { id, setFieldTouched } = this.props;
    setFieldTouched(id, true);
  };
  handleSelect(value, enter = false) {
    const { id, handlers, shouldHandleEnter, setValues, values } = this.props;
    geocodeByAddress(value)
      .then(([results]) => {
        const data = results.address_components;
        const latitude = results.geometry.location.lat();
        const longitude = results.geometry.location.lng();
        const formattedAddress = results.formatted_address;
        const country = getSpecificLocationValue(data, 'country');
        const city = getSpecificLocationValue(data, 'locality', 'postal_town');
        const state = getSpecificLocationValue(data, 'administrative_area_level_1');
        const zip = getSpecificLocationValue(data, 'postal_code');
        const streetNumber = getSpecificLocationValue(data, 'street_number');
        const route = getSpecificLocationValue(data, 'route');
        const address1 = `${streetNumber} ${route}`;
        const resultObject = {
          zip,
          city,
          state,
          country,
          address1,
          latitude,
          longitude,
          label: id,
          formattedAddress,
        };
        setValues(R.merge(R.or(values, {}), resultObject));
      })
      .catch((error) => {
        const handleEnter = R.path(['handleEnter'], handlers);
        if (G.isAllTrue(enter, R.is(Function, handleEnter), shouldHandleEnter)) {
          handleEnter(value, id);
        }
        // G.handleException(error, 'geocodeByAddress');
      });
  };
  render () {
    return (
      <PlacesAutocompleteWrapper
        width={this.props.width}
        border={this.props.border}
        hasError={this.props.hasError}
        borderRadius={this.props.borderRadius}
        borderTLRadius={this.props.borderTLRadius}
        borderBLRadius={this.props.borderBLRadius}
        borderTRRadius={this.props.borderTRRadius}
        bordeBRrRadius={this.props.bordeBRrRadius}
      >
        <PlacesAutocomplete
          classNames={{
            autocompleteContainer: 'search-autocomplete-container',
          }}
          autoComplete='off'
          id={this.props.id}
          onSelect={this.handleSelect}
          onEnterKeyDown={(value) => this.handleSelect(value, true)}
          inputProps={{
            placeholder: R.or(this.props.placeholder, 'Search a location...'),
            value: this.props.value,
            onChange: this.handleChange,
            onBlur: this.handleBlur,
          }} />
      </PlacesAutocompleteWrapper>
    );
  }
}

export default PlacesAutocompleteInput;
