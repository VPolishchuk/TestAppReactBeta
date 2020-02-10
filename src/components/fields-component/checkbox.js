import * as R from 'ramda';
import React, { useEffect, useState } from 'react';
import './style.scss';
/////////////////////////////////////////////////////////////

export const CheckboxInputComponent = (props) => {
  const {
    type,
    // setChecked,
    // checked,
    values,
    name,
    // edit,
    label,
    checked,
    handleBlur,
    handelChangeR,
    setValues,
    ...rest } = props;
  // const [checked, setChecked] = useState(false);

  //   const handleChange = () => {
  //     console.log('render')
  //     setChecked(!checked)
  //   }
    // useEffect(() => {
    //   // console.log('render2')
    //   setValues(R.set(R.lensProp(name), checked, values))
    //   // handleCheck(R.path([name], values));
    // }, [checked])
    return (
      <div className="input-wrap">
        <label>
          <span>{label}</span>
          <div className={`checkbox-container ${checked ? 'checked' : ''}`}>
            <input
              type={type}
              name={name}
              checked={checked}
              onBlur={handleBlur}
              onChange={() => handelChangeR(name, !checked)}
            />
            <div className="styled-container">
              <svg
                fill='none'
                stroke='white'
                stroke-width='2px'
                viewBox="0 0 24 24"
                className={checked && 'checked'}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
        </label>
      </div>
    );
  };

export default CheckboxInputComponent;
