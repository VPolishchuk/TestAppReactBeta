import * as R from 'ramda';
import React, { useEffect, useState } from 'react';
import './style.scss';
/////////////////////////////////////////////////////////////

export const CheckboxInputComponent = (props) => {
  const {
    type,
    values,
    name,
    label,
    checked,
    handleBlur,
    handelCastomChange,
    ...rest } = props;
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
              onChange={() => handelCastomChange(name, !checked)}
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
