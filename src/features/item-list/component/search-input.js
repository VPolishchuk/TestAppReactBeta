import R from 'ramda';
import React, { useState, useEffect } from 'react';
import './style.scss';
///////////////////////////////////////////////////////
const SearchComponent = (props) => {
    const [value, setValue] = useState(null);
    const handelChange = (value) => setValue(value);
    console.log('#####################3', value)
    
    useEffect(() => {

    }, [])
    return (
        <div className='search-wrap'>
            <img src="https://img.icons8.com/material-rounded/24/000000/search.png"></img>
            <input
                type='search'
                value={value}
                onChange={(e) => handelChange(e.target.value)}
            />
        </div>
    );
}

export default SearchComponent;
