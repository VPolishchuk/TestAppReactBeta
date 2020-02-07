import R from 'ramda';
import app from "../../../firebase-config";
import React, { useState, useEffect } from 'react';
import './style.scss';
///////////////////////////////////////////////////////
const SearchComponent = (props) => {
    const [value, setValue] = useState(null);
    const [searchField, setSearchfield] = useState(null);
    const handelChange = (value) => {
        const searchFunct = async() => {

        }

        return setValue(value);
    }

    const handelSearch = () => {
        const db = app.firestore();
        const docRef = db.collection("employees").where("empName", "==", value)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);


        db.collection("cities").where("capital", "==", true)
  
    });
    }

    useEffect(() => {

    }, [])
    return (
        <div className='search-wrap'>
            <img onClick={() => handelSearch()} src="https://img.icons8.com/material-rounded/24/000000/search.png"></img>
            <input
                type='search'
                value={value}
                onChange={(e) => handelChange(e.target.value)}
            />
            {/* <button >search</button> */}
        </div>
    );
}

export default SearchComponent;
