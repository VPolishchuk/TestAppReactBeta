import { createSelector } from 'reselect';
import * as R from 'ramda';
///////////////////////////////////////////////////////////////////////////////////////////////////

const selectProfileStore = (state) => state.list;

const makeSelectEmployeesList = () => createSelector(
  selectProfileStore,
  (list) => R.path(['employeesList'], list),
);

const makeSelectDepartmentsList = () => createSelector(
  selectProfileStore,
  (list) => R.path(['departmentsList'], list),
);

export {
  makeSelectEmployeesList,
  makeSelectDepartmentsList
};
