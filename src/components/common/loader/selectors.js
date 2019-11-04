import { createSelector } from 'reselect';
///////////////////////////////////////////////////////////////////////////////////////////////////

const selectLoaderStore = (state) => state.loader;

const makeSelectLoaderStatus = () => createSelector(
  selectLoaderStore,
  (loader) => loader.loaderOpened,
);



export {
	makeSelectLoaderStatus,
};
