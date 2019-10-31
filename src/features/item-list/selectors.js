import { createSelector } from 'reselect';
///////////////////////////////////////////////////////////////////////////////////////////////////

const selectProfileStore = (state) => state.items;

const makeSelectItemList = () => createSelector(
  selectProfileStore,
  (item) => item.list,
);

export {
  makeSelectItemList,
};
