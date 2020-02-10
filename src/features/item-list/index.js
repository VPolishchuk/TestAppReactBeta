// import * as R from 'ramda';
import * as R from 'ramda';
import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import InfiniteScroll from "react-infinite-scroll-component";
// features
import app from "../../firebase-config";
import SearchComponent from './component/search-input';
import CreateEmpFormComponent from './component/item-form';
// import CreateEmpFormComponent from './component/form';
import {
  makeSelectEmployeesList,
  makeSelectDepartmentsList } from './selectors';
import {
  createItemRequest,
  deleteItemRequest,
  getSearchItemRequest,
  getEditItemDataRequest,
  getEmployeesDataSuccess,
  getEmployeesDataRequest,
  getDepartmentsDataSuccess,
} from './actions';
// ui
import './style.scss';
// /////////////////////////////////////////////////////////////////

const ActionComponent = (props) => {
  const { handleEditEmp, handelDelete } = props;
  return (
    <div className='column actions'>
      <img className='view' src="https://img.icons8.com/ios/50/000000/invisible.png" />
      <img className='edit' onClick={() => handleEditEmp()} src="https://img.icons8.com/ios-glyphs/30/000000/edit.png"/>
      <img className='delete'  onClick={() => handelDelete()}  src="https://img.icons8.com/material-rounded/24/000000/delete.png"/>
    </div>
)};

const RowComponent = (props) => {
  const {
    item,
    edit,
    modal,
    column,
    options,
    setEdit,
    setModal,
    deleteItemRequest,
    getEditItemDataRequest,
   } = props;
  const handleEditEmp = () => {
    getEditItemDataRequest(item);
    setEdit(!edit)
    setModal(!modal)
  }
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
    <div key={props.i} className='row'>
      {
        column.map(
          (key,i ) => {
          if(key === 'actions') {
            return (
              <ActionComponent
                handleEditEmp={handleEditEmp}
                handelDelete={handelDelete}
              />
            )
          }
          if(key === 'empActive') {
            return (
              <div key={i} className='column empActive'>
              {
                item[key] ? 
                <img src="https://img.icons8.com/material-rounded/24/000000/checked.png"/> :
                <img src="https://img.icons8.com/material-rounded/24/000000/cancel.png"/>
              }
            </div>
              
            )
          }
          return (
            <div key={i} className={`column ${key}`}>
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
)};

export const ItemListComponent = (props) => {
  const {
    employeesList,
    departmentsList,
    updateItemRequest,
    deleteItemRequest,
    getSearchItemRequest,
    getEditItemDataRequest,
    getEmployeesDataSuccess,
    getEmployeesDataRequest,
    getDepartmentsDataSuccess } = props;
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false)
  const [hasMore, setHasMore] = useState(false)

  const getMoreData = () => {
    props.getEmployeesDataRequest();

  }

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
        <SearchComponent
          actionSR={getSearchItemRequest}
          actionCL={getEmployeesDataRequest}
        />
        <header>
          {
            column.map(
              (item, i) => <div key={i} i={i} className={`column ${item}`}>{item}</div>
            )
          }
        </header>
          <div id='scrollableDiv' className='rows-wrapper'>
            {/* <InfiniteScroll
              dataLength={combList.length}
              next={getMoreData()}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              height={500}
              scrollableTarget="scrollableDiv"
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            > */}
              {
                combList.map(
                  (item, i) => (
                    <RowComponent
                      i={i}
                      key={i}
                      edit={edit}
                      item={item}
                      modal={modal}
                      column={column}
                      setEdit={setEdit}
                      setModal={setModal}
                      options={departmentsOptions}
                      deleteItemRequest={deleteItemRequest}
                      updateItemRequest={updateItemRequest}
                      getEditItemDataRequest={getEditItemDataRequest}
                    />
                  )
                )
              }
            {/* </InfiniteScroll> */}
          </div>
      </div>
      {
        modal &&
        <div className='modal-wrap'>
          <CreateEmpFormComponent
            edit={edit}
            setEdit={setEdit}
            setModal={setModal}
            options={departmentsOptions}
          />
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
  getSearchItemRequest,
  getEditItemDataRequest,
  getEmployeesDataRequest,
  getEmployeesDataSuccess,
  getDepartmentsDataSuccess,
})(ItemListComponent);
