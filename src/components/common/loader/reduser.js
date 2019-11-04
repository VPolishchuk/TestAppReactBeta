import { createReducer } from 'redux-act';
// feature modal
import * as A from './actions';
///////////////////////////////////////////////////////////////////////////////////////////////////

export const initialState = {
  loaderOpened: false
};

export const openLoader = (state, payload) => ({
  loaderOpened: true,
});

export const closeLoader = (state, payload) => ({
  loaderOpened: false,
});


export default createReducer({
  [A.setOpenLoader]: openLoader,
  [A.setCloseLoader]: closeLoader,
}, initialState);
