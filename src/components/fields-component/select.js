import * as R from 'ramda';
import Select from 'react-select';
import React, { useEffect, useState } from 'react';
import './style.scss';
/////////////////////////////////////////////////////////////

const SelectInputComponent = ({
    name,
    label,
    values,
    options,
    setValues,
    labelDisplay,
    defOption,
  }) => {
    const [selectedOption, setSelectedOptions] = useState({});

    const handleChange = selectedOption => {
        setSelectedOptions(selectedOption);
    };
    useEffect(() => {
        setValues(R.set(R.lensProp(name), selectedOption, values))
    }, [selectedOption])
    return (
        <>
        {
            labelDisplay &&
            <label>{label}</label>
        }
        <Select
            options={options}
            value={selectedOption}
            onChange={handleChange}
        />
        </ >
    )
};

export default SelectInputComponent;
