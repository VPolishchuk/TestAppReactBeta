import * as R from 'ramda';
import Select from 'react-select';
import React, { useEffect, useState } from 'react';
import './style.scss';
/////////////////////////////////////////////////////////////

const SelectInputComponent = ({
    name,
    label,
    options,
    labelDisplay,
    selectedOption,
    handelCastomChange
  }) => (
    <>
    {
        labelDisplay &&
        <label>{label}</label>
    }
    <Select
        options={options}
        value={selectedOption}
        onChange={(newOpt) => handelCastomChange(name, newOpt)}
    />
    </ >
)

export default SelectInputComponent;
