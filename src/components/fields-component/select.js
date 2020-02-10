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
    handelChangeR
  }) => (
    <>
    {
        labelDisplay &&
        <label>{label}</label>
    }
    <Select
        options={options}
        value={selectedOption}
        onChange={(newOpt) => handelChangeR(name, newOpt)}
    />
    </ >
)

export default SelectInputComponent;
