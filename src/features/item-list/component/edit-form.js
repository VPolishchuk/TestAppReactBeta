import React, { useCallback } from 'react';
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
    const { keys, item, updateItemRequest, options } = props;
    const indxField = R.indexBy(R.prop('name'), fieldSetting);
    return (
        <Formik
            initialValues={{
                ...item
            }}
            onSubmit={(values) => {
                const empDpID = R.path(['empDepartment', 'value'], values);
                const newValue = R.assoc('emp_dpID', empDpID, R.omit(['empDepartment'], values))
                const db = app.firestore()
                console.log('values', values)
                console.log('newValue', newValue)
                console.log('newValue', item.empID)
                

                // const testv = db.collection('employees').doc(item.empID)
                // db.update(testv, {...newValue})
                db.collection('employees').doc(item.empID).set({...newValue})
                    .then(function(data) {
                        console.log("Document successfully deleted!", data);
                        debugger;
                        // updateItemRequest({id: item.empID, values: newValue })
                    }).catch(function(error) {
                        console.error("Error removing document: ", error);
                    });
            }}
        >
            {
                props => (
                    <form className='active' onSubmit={props.handleSubmit}>
                        {
                            keys.map(
                                (key, i ) => {
                                    if(key === 'actions') {
                                        return (
                                            <button type='submit'>Update</button>
                                        )
                                    }

                                    if ({...indxField[key]}.type === 'select') {
                                        return (
                                          <SelectInput {...indxField[key]} {...props} options={options} initValue={props.values[key]} />
                                        )
                                    }
                        
                                    if ({...indxField[key]}.type === 'checkbox') {
                                        return (
                                            <Checkbox {...indxField[key]} {...props} />
                                        )
                                    }
                                    return (
                                    <label key={i}>
                                        <input
                                            {...indxField[key]}
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
            )}
        </Formik>

    )
}

export default EditForm;
