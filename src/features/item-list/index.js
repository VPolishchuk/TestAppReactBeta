import * as R from 'ramda';
import { connect } from 'react-redux';
import React, { useState, } from 'react';
import { createStructuredSelector } from 'reselect';
import InfiniteScroll from "react-infinite-scroll-component";
import * as C from '../../global/constants';
import { goToRoute } from '../../routes-saga';
// features
import app from "../../firebase-config";
import SearchComponent from './component/search-input';
import CreateEmpFormComponent from './component/item-form';
import {
  makeSelectEmployeesList,
  makeSelectDepartmentsList } from './selectors';
import {
  createItemRequest,
  deleteItemRequest,
  getSearchItemRequest,
  getEditItemDataRequest,
  getEmployeesDataRequest,
} from './actions';
// ui
import './style.scss';
// /////////////////////////////////////////////////////////////////

export const replaceKeysToParams = (options, endpoint) => {
  if (R.or(R.is(String, options), R.is(Number, options))) {
    return R.replace(/:[^/]*/, options, endpoint);
  } 
  return endpoint;
};

const ActionComponent = (props) => {
  const { handleEditEmp, handelDelete, handleGoToDetailPage } = props;
  return (
    <div className='column actions'>
      <img className='view' onClick={() => handleGoToDetailPage()} src="https://img.icons8.com/ios/50/000000/invisible.png" />
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
  
  const handleGoToDetailPage = () => {
    goToRoute(replaceKeysToParams(item.empID, C.ROUTE_PATH_DETAILS))
  }

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
                handleGoToDetailPage={handleGoToDetailPage}
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
    getEmployeesDataRequest  } = props;
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const getMoreData = () => {
    props.getEmployeesDataRequest(true);
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
          setHasMore={setHasMore}
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
            <InfiniteScroll
              dataLength={combList.length}
              next={getMoreData}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              height={300}
              scrollableTarget="scrollableDiv"
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
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
            </InfiniteScroll>
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
})(ItemListComponent);
