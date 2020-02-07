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
    // initValue,
    labelDisplay,
    defOption,
    // selectedOption,
    // setSelectedOptions
  }) => {
    const [selectedOption, setSelectedOptions] = useState({});
    // console.log('initValue', initValue)
    console.log('selectedOption', selectedOption)
    console.log('defOption', defOption)

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
