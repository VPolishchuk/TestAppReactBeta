import * as  R from 'ramda';
import React, { useState } from 'react';
import app from "../../../firebase-config";
import './style.scss';
///////////////////////////////////////////////////////
const SearchComponent = (props) => {
    const [value, setValue] = useState(null);
    const handelClean = () => {
        props.setHasMore(true)
        setValue('');
        props.actionCL();
    }

    const handelSearch = () => {
        props.setHasMore(false)
        const db = app.firestore();
        const docRef = db.collection("employees").where("empName", "==", value)
            .get()
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => {
                    let data = doc.data();
                    if (R.has('empID', data) && R.isEmpty(data.empID)) {
                      data = R.set(R.lensProp('empID'), doc.id, data);
                    } else {
                      data = R.assoc('empID', doc.id, data)
                    }
                    return ({...data})
                });
                props.actionSR(data)
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);  
            });
    }
    return (
        <div className='search-wrap'>
            <img src="https://img.icons8.com/material-rounded/24/000000/search.png"></img>
            <input
                type='text'
                value={value}
                placeholder={`Search by empName`}
                onChange={(e) => setValue(e.target.value)}
            />
            <button
                disabled={R.or(R.isNil(value), R.isEmpty(value) ? true : false)}
                onClick={() => handelSearch()}
            >
                Search
            </button>
            <button
                disabled={R.or(R.isNil(value), R.isEmpty(value) ? true : false)}
                onClick={() => handelClean()}
                className='cancel'
            >
                Clear Filter
            </button>
        </div>
    );
}

export default SearchComponent;