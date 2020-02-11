import * as R from 'ramda';
import Select from 'react-select';
import React, { useEffect, useState } from 'react';
import './style.scss';
/////////////////////////////////////////////////////////////

const SelectInputComponent = ({
    name,
    label,
    touched,
    options,
    errors,
    labelDisplay,
    selectedOption,
    handelCastomChange
  }) => (
    <div>
    {
        labelDisplay &&
        <label>{label}</label>
    }
    <Select
        options={options}
        value={selectedOption}
        onChange={(newOpt) => handelCastomChange(name, newOpt)}
    />
    {R.or(R.has(name.value, touched), R.has(name.value, errors)) ? (
        <div
        className="error"
        style={{
            color: 'red',
            fontSize: '12px',
            marginTop: '5px',
            textAlign: 'center',
        }}
        >
        {errors[name.value]}</div>
    ) : null}
    </div>
)

export default SelectInputComponent;
