import { createSelector } from 'reselect';
///////////////////////////////////////////////////////////////////////////////////////////////////

const selectModalStore = (state) => state.modal;

const makeSelectModalContent = () => createSelector(
  selectModalStore,
  (modal) => modal.component,
);

const makeSelectModalStyleContent = () => createSelector(
  selectModalStore,
  (modal) => modal.style,
);

const makeSelectModalIsOpen = () => createSelector(
  selectModalStore,
  (modal) => modal.modalOpened,
);

export {
	makeSelectModalIsOpen,
  makeSelectModalContent,
  makeSelectModalStyleContent,
};
