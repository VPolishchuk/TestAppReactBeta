// import * as R from 'ramda';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import React, { useState, useEffect, useContext } from 'react';
// component
import SingInForm from '../auth';
// features
import app from "../../firebase-config";
import EditForm from './component/edit-form';
import SearchComponent from './component/search-input';
import CreateEmpFormComponent from './component/item-form';
import {
  makeSelectEmployeesList,
  makeSelectDepartmentsList } from './selectors';
import {
  createItemRequest,
  deleteItemRequest,
  updateItemRequest,
  getEmployeesDataSuccess,
  getDepartmentsDataSuccess,
} from './actions';
// ui
import './style.scss';
// /////////////////////////////////////////////////////////////////


const ActionComponent = (props) => {
  const { edit, setEdit, handelDelete } = props;
  return (
    <div className='column actions'>
      <img src="https://img.icons8.com/ios/50/000000/invisible.png" />
      <img onClick={() => setEdit(!edit)} src="https://img.icons8.com/ios-glyphs/30/000000/edit.png"/>
      <img onClick={() => handelDelete()}  src="https://img.icons8.com/material-rounded/24/000000/delete.png"/>
    </div>
)};

const RowComponent = (props) => {
  const {
    item,
    column,
    options,
    deleteItemRequest,
    updateItemRequest,
   } = props;
  const [edit, setEdit] = useState(false)

  const handelDelete = () => {
    const db = app.firestore()
    db.collection('employees').doc(item.empID).delete()
      .then(function() {
        console.log("Document successfully deleted!");
        deleteItemRequest(item.empID)
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
  }

  return (
    <div className='row-wrap'>
      <div key={props.i} className='row'>
        {
          column.map(
            (key,i ) => {
            if(key === 'actions') {
              return (
                <ActionComponent
                  edit={edit}
                  setEdit={setEdit}
                  handelDelete={handelDelete}
                />
              )
            }
            if(key === 'empActive') {
              return (
                <div key={i} className='column'>
                {
                  item[key] ? 
                  <img src="https://img.icons8.com/material-rounded/24/000000/checked.png"/> :
                  <img src="https://img.icons8.com/material-rounded/24/000000/cancel.png"/>
                }
              </div>
                
              )
            }
            return (
              <div key={i} className='column'>
                {
                  R.is(Object, item[key]) ? 
                  item[key].label :
                  item[key]
                }
              </div>
            )
          })
        }
      </div>
      <EditForm keys={column} item={item} options={options} updateItemRequest={updateItemRequest}/>
    </div>
)}

export const ItemListComponent = (props) => {
  const {
    employeesList,
    updateItemRequest,
    deleteItemRequest,
    departmentsList,
    getEmployeesDataSuccess,
    getDepartmentsDataSuccess } = props;
  const [modal, setModal] = useState(false);

  const departmentsOptions = departmentsList.map(
    (item) => ({
      value: item.dpID,
      label: item.dpName,
    })
  );
  const combList = R.values(employeesList).map(
    (item) => {
      const empDepartment = R.find(R.propEq('value', item.emp_dpID))(departmentsOptions);
      let newItem = R.assoc('empDepartment', empDepartment, item);
      newItem = R.omit(['emp_dpID'], newItem);
      return newItem;
  })
  let column = R.keys(R.omit(['emp_dpID'], R.head(R.values(employeesList))));
  column.push('empDepartment', 'actions');

  useEffect(() => {
    const fetchData = async () => {
      const db = app.firestore();
      const dataEmp = await db.collection('employees').get();
      const dataDep = await db.collection('departments').get();
      const employeesData = dataEmp.docs.map(doc => {
        let data = doc.data();
        if (R.has('empID', data) && R.isEmpty(data.empID)) {
          data = R.set(R.lensProp('empID'), doc.id, data);
        }
        return ({...data})
      });
      const departmentsData = dataDep.docs.map(doc => ({...doc.data()}));
      getEmployeesDataSuccess(employeesData);
      getDepartmentsDataSuccess(departmentsData);
    };
    fetchData();
  }, [])
  return (
    <>
      <nav>
        {
          !modal &&
          <button className='add-emp' onClick={() => setModal(true)}>
            Add Employees
          </button>
        }
        <button onClick={() => app.auth().signOut()}>Sign out</button>
      </nav>
      <div className='tb-wrap'>
        <SearchComponent {...props}/>
        <header>
          {
            column.map(
              (item, i) => <div key={i} i={i} className='column'>{item}</div>
            )
          }
        </header>
        <div className='rows-wrapper'>
          {
            combList.map(
              (item, i) => (
                <RowComponent
                  i={i}
                  key={i}
                  item={item}
                  column={column}
                  options={departmentsOptions}
                  deleteItemRequest={deleteItemRequest}
                  updateItemRequest={updateItemRequest}
                />
              )
            )
          }
        </div>
      </div>
      {
        modal &&
        <div className='modal-wrap'>
          <CreateEmpFormComponent options={departmentsOptions} setModal={setModal}/>
        </div>
      }
    </>
)}


const mapStateToProps = (state) => (createStructuredSelector({
  employeesList: makeSelectEmployeesList(state),
  departmentsList: makeSelectDepartmentsList(state)
}));

export default connect(mapStateToProps, {
  createItemRequest,
  deleteItemRequest,
  updateItemRequest,
  getEmployeesDataSuccess,
  getDepartmentsDataSuccess,
})(ItemListComponent);
