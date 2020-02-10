import { createAction } from 'redux-act';
///////////////////////////////////////////////////////////////////////////////////////////////////

export const getEmployeesDataSuccess = createAction('getEmployeesDataSuccess');

export const getEmployeesDataRequest = createAction('getEmployeesDataRequest');

export const getDepartmentsDataSuccess = createAction('getDepartmentsDataSuccess');

export const getDepartmentsDataRequest = createAction('getDepartmentsDataRequest');

export const createItemRequest = createAction('createItemRequest');

export const deleteItemRequest = createAction('deleteItemRequest');

export const updateItemRequest = createAction('updateItemRequest');

export const getEditItemDataRequest = createAction('getEditItemDataRequest');

export const clearEditItemRequest = createAction('clearEditItemRequest');

export const getSearchItemRequest = createAction('getSearchItemRequest');

export const getDetailPageRequest = createAction('getDetailPageRequest');

export const getDetailPageSuccess = createAction('getDetailPageSuccess');
