import React, { useState, useEffect } from 'react';
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
        labelDisplay: true,
        name: 'empDepartment',
        label: 'Emp Department',
    }
];

const FormComponent = (props) => {
  console.log('FormComponent', props.values)
  return (
    <form id ='create-item-form' onSubmit={props.handleSubmit}>
      <p>Add Item</p>
      {
        fieldSetting.map(
          (field, i) => {
              if (field.type === 'select') {
                return (
                  <SelectInput {...field} {...props} />
                )
              }

              if (field.type === 'checkbox') {
                return (
                  <Checkbox {...field} {...props} />
                )
              }
              return  (
              <div key={i} className="input-wrap">
                <label>{field.label}</label>
                <input
                  {...field}
                  onBlur={props.handleBlur}
                  onChange={props.handleChange}
                  />
              </div>
            )
          }
        )
      }         
      <div className='action-wrap'>
        <button type='submit'>Save</button>
        <button onClick={() => props.setModal(false)}>Cancel</button>
      </div>
    </form>
  )
}

const CreateEmpFormComponent = (props) => {
  const { setModal, options } = props;
  return (
      <div className='item-form-wrap'>
          <Formik
              initialValues={{
                  empID: '',
                  empName: '',
                  empActive: '',
                  empDepartment: ''
              }}
              onSubmit={(values) => {
                const empDpID = R.pick(['empDepartment'], values);
                const formValue = R.assoc(
                  'emp_dpID',
                  R.path(['empDepartment', 'value'], empDpID),
                  R.omit(['empDepartment'], values)
                );
                debugger;
                const createItem  = async () => {
                  try {
                    await app
                    .firestore()
                    .collection("employees").add({
                      ...formValue
                    })
                      
                  } catch(err) {
                      console.error(err)
                  }
                }
                createItem();
                // setModal(false);
              }}
          >
            {
              props => (
                <FormComponent options={options} setModal={setModal} {...props} />
              )
            }
          </Formik>
      </div>
)}

export default CreateEmpFormComponent;