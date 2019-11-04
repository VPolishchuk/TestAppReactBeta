import { createReducer } from 'redux-act';
// feature modal
import * as A from './actions';
///////////////////////////////////////////////////////////////////////////////////////////////////

export const initialState = {
  style: {},
  component: {},
  modalOpened: false
};

export const openModal = (state, payload) => ({
  modalOpened: true,
  style: payload.style,
  component: payload.component,
});

export const closeModal = (state) => ({
  style: {},
  component: {},
  isOpened: false,
});

export default createReducer({
  [A.setOpenModal]: openModal,
  [A.setCloseModal]: closeModal,
}, initialState);
