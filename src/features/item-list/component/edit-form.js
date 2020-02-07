import React, { useCallback, useEffect, useState } from 'react';
import * as R from 'ramda';
import { Formik } from 'formik';
import app from "../../../firebase-config";
import Checkbox from '../../../components/fields-component/checkbox';
import SelectInput from '../../../components/fields-component/select';
import './style.scss';
/////////////////////////////////

const fieldSetting = [
    {
        type: 'text',
        name: 'empName',
        label: 'Emp Name',
    },
    {
        type: 'checkbox',
        name: 'empActive',
        label: 'Active',
    },
    {
        type: 'select',
        labelDisplay: false,
        name: 'empDepartment',
        label: 'Emp Department',
    }
]

const EditForm = (props) => {
    useEffect(() => {
        props.setValues(props.item)
    }, [props.item.empDepartment]) 
    return (
        <form className='active' id={`edit-form-${props.item.empID}`} onSubmit={props.handleSubmit}>
            {
                props.keys.map(
                    (key, i ) => {
                        if(key === 'actions') {
                            return (
                                <button type='submit'>Update</button>
                            )
                        }

                        if ({...props.indxField[key]}.type === 'select') {
                            return (
                            <SelectInput
                                {...props.indxField[key]}
                                {...props}
                                options={props.options}
                                initValue={R.path([key], props.values)}
                            />
                            )
                        }
            
                        if ({...props.indxField[key]}.type === 'checkbox') {
                            return (
                                <Checkbox {...props.indxField[key]} {...props} initValue={R.path([key], props.values)}/>
                            )
                        }
                        return (
                        <label key={i}>
                            <input
                                {...props.indxField[key]}
                                onBlur={props.handleBlur}
                                value={props.values[key]}
                                onChange={props.handleChange}
                                disabled={R.equals('empID', key) ? true : false}
                            />
                            {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                        </label>
                    )}
                )
            }
        </form>
    )
}
const EditFormComponent = (props) => {
    const { keys, item, updateItemRequest, initialValues, options } = props;
    const indxField = R.indexBy(R.prop('name'), fieldSetting);
    return (
        <Formik
            initialValues={{
                ...props.initialValues
            }}
            onSubmit={(values) => {
                const empDpID = R.path(['empDepartment', 'value'], values);
                // const newValue = R.assoc('emp_dpID', empDpID, R.omit(['empDepartment'], values))
                const db = app.firestore()
             
                
                db.collection('employees').doc(item.empID).set({...R.omit(['empDepartment'], values)})
                    .then(function(data) {
                        console.log("Document successfully deleted!", data);
                        // debugger;
                        updateItemRequest({id: item.empID, values: values })
                    }).catch(function(error) {
                        console.error("Error removing document: ", error);
                    });
            }}
        >
            {props => (
                <EditForm
                    {...props}
                    item={item}
                    keys={keys}
                    options={options}
                    indxField={indxField}
                    updateItemRequest={updateItemRequest}
                />
            )}
        </Formik>

    )
}

export default EditFormComponent;
