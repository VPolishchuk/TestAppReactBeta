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

const makeSelectItem = () => createSelector(
  selectProfileStore,
  (list) => R.path(['item'], list),
);

const makeSelectLimitList = () => createSelector(
  selectProfileStore,
  (list) => R.path(['limit'], list),
);

const makeSelectLastVisible = () => createSelector(
  selectProfileStore,
  (list) => R.path(['lastVisible'], list),
);

export {
  makeSelectItem,
  makeSelectLimitList,
  makeSelectLastVisible,
  makeSelectEmployeesList,
  makeSelectDepartmentsList
};
