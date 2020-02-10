import * as P from 'plow-js';
import * as R from 'ramda';
import { createReducer } from 'redux-act';
// feature
import * as A from './actions';
///////////////////////////////////////////////////////////////////////////////////////////////////

export const initialState = {
  limit: 10,
  lastVisible: null,
  employeesList: {},
  departmentsList: [],
  item: {}
};

const getEditItemDataRequest = (state, data) => (
  P.$set('item', data, state)
);

const getEmployeesListData = (state, data) => {
  const indexObj =  R.indexBy(R.prop('empID'), data);
  const newData = R.merge(R.path(['employeesList'], state), indexObj)
  return (
  P.$set('employeesList', newData, state)
)};

const getSearchItemRequest = (state, data) => {
  const indexObj =  R.indexBy(R.prop('empID'), data);
  return (
  P.$set('employeesList', indexObj, state)
)};

const getDepartmentsListData = (state, data) => (
  P.$set('departmentsList', data, state)
);

const deleteEmployeerFromList = (state, data) => (
  P.$set('employeesList', R.omit([data], R.path(['employeesList'], state)), state)
);

const clearEditItemRequest = (state, data) => (
  P.$set('item', {}, state)
);

const updateEmployeersList = (state, data) => {
  const upData = R.set(
    R.lensProp(data.id),
    data.values,
    R.path(['employeesList'], state)
  )
  return (
    P.$set('employeesList', upData, state)
)};

export default createReducer({
  [A.updateItemRequest]: updateEmployeersList,
  [A.getEmployeesDataSuccess]: getEmployeesListData,
  [A.getDepartmentsDataSuccess]: getDepartmentsListData,
  [A.deleteItemRequest]: deleteEmployeerFromList,
  [A.getEditItemDataRequest]: getEditItemDataRequest,
  [A.clearEditItemRequest]: clearEditItemRequest,
  [A.getSearchItemRequest]: getSearchItemRequest,
}, initialState);
