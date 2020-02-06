import { createAction } from 'redux-act';
///////////////////////////////////////////////////////////////////////////////////////////////////

export const getEmployeesDataSuccess = createAction('getEmployeesDataSuccess');

export const getDepartmentsDataSuccess = createAction('getDepartmentsDataSuccess');

export const createItemRequest = createAction('createItemRequest');

export const deleteItemRequest = createAction('deleteItemRequest');

export const updateItemRequest = createAction('updateItemRequest');

