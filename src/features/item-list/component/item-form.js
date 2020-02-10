import React, { useState, useEffect } from 'react';
import * as R from 'ramda';
import {  createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import app from "../../../firebase-config";
import Checkbox from '../../../components/fields-component/checkbox';
import SelectInput from '../../../components/fields-component/select';
import './style.scss';
import { makeSelectItem } from '../selectors';
import { clearEditItemRequest, updateItemRequest } from '../actions';
/////////////////////////////////////////////////////////////////////////

const fieldSetting = [
    {
        type: 'text',
        name: 'empName',
        label: 'Emp Name',
    },
    {
        type: 'checkbox',
        name: 'empActive',
        label: 'Emp Active',
    },
    {
        type: 'select',
        labelDisplay: true,
        name: 'empDepartment',
        label: 'Emp Department',
    }
];

const FormComponent = (props) => {
  const handleChangeR = (name, data) => {
    props.setValues(R.assoc(name, data, props.values))
  }
  useEffect(() => {
    props.setValues(props.initValues)
  }, [props.initValues])
  return (
    <form id ='create-item-form' onSubmit={props.handleSubmit}>
      <p>{props.edit ? 'Edit Item' : 'Add Item'}</p>
      {
        fieldSetting.map(
          (field, i) => {
              if (field.type === 'select') {
                return (
                  <SelectInput
                    {...field}
                    {...props}
                    handelCastomChange={handleChangeR}
                    selectedOption={props.values && props.values[field.name]}
                  />
                )
              }

              if (field.type === 'checkbox') {
                return (
                  <Checkbox
                    {...field}
                    {...props}
                    handelCastomChange={handleChangeR}
                    checked={props.values && props.values[field.name]}
                  />
                )
              }
              return  (
              <div key={i} className="input-wrap">
                <label>{field.label}</label>
                <input
                    {...field}
                    onBlur={props.handleBlur}
                    onChange={(e) => handleChangeR(field.name, e.target.value)}
                    value={props.values && props.values[field.name]}
                  />
              </div>
            )
          }
        )
      }         
      <div className='action-wrap'>
        <button type='submit' className='add-emp'>Save</button>
        <button type='button' className='cancel' onClick={() => props.closeModal()}>Cancel</button>
      </div>
    </form>
  )
}

export const CreateEmpFormComponent = (props) => {
  const { setModal, setEdit, options, initialValues, edit, clearEditItemRequest, updateItemRequest } = props;
  const dafauldFields = {
    empID: '',
    empName: '',
    empActive: false,
    empDepartment: ''
  }
  const closeModal = () => {
    if (edit) {
      setEdit(!edit)
      clearEditItemRequest();
    }
    setModal(false)
  }
  return (
      <div className='item-form-wrap'>
          <Formik
              initialValues={R.or(initialValues, dafauldFields)}
              onSubmit={(values) => {
                const empDpID = R.path(['empDepartment'], values);
                let formValue = R.assoc(
                  'emp_dpID',
                  R.path(['value'], empDpID),
                  R.omit(['empDepartment'], values)
                );
                if (!edit) {
                  formValue = R.assoc('empID', '', formValue);
                }

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

                const updateItem  = async () => {
                  try {
                    await app
                    .firestore()
                    .collection("employees").
                    doc(formValue.empID)
                    .set({
                      ...formValue
                    })
                    updateItemRequest({id: formValue.empID, values: formValue })
                  } catch(err) {
                      console.error(err)
                  }
                }
                edit ?
                updateItem() : 
                createItem()
                setModal(false);
              }}
          >
            {
              props => (
                <FormComponent
                  {...props}
                  edit={edit}
                  options={options}
                  setModal={setModal}
                  closeModal={closeModal}
                  initValues={initialValues}
                />
              )
            }
          </Formik>
      </div>  
)}


const mapStateToProps = (state) => (createStructuredSelector({
  initialValues: makeSelectItem(state),
}));

export default connect(mapStateToProps, {
  updateItemRequest,
  clearEditItemRequest,
})(CreateEmpFormComponent);