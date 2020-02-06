import * as P from 'plow-js';
import * as R from 'ramda';
import { createReducer } from 'redux-act';
// feature
import * as A from './actions';
///////////////////////////////////////////////////////////////////////////////////////////////////

export const initialState = {
  employeesList: {},
  departmentsList: [],
};

const getEmployeesListData = (state, data) => {
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
}, initialState);
