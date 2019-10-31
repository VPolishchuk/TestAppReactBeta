import * as P from 'plow-js';
import * as R from 'ramda';
import { createReducer } from 'redux-act';
// helpers
import * as G from '../../global/helpers';
// feature
import * as A from './actions';
///////////////////////////////////////////////////////////////////////////////////////////////////
const initialData = [
  {
    name: 'test1',
    price: '122131',
    total: '32',
    location: 'lviv',
    guid: G.genShortId(),
  },
  {
    name: 'test2',
    price: '124',
    total: '12',
    location: 'kyiv',
    guid: G.genShortId(),
  }
];

export const initialState = {
  list: [
    ...initialData,
  ],
};

export const getItemListRequest = (state, data) => (
  P.$set('list', data, state)
);

export const createItemRequest = (state, data) => {
  const newList = R.append(
    R.assoc('guid', G.genShortId(), data),
    R.path(['list'], state)
  )
  G.setItemToLocalStorage('list', newList);
  return (
    P.$set('list', newList, state)
)};

export const deleteItemRequest = (state, guid) => {
  const newList = R.values(
    R.omit(
      [guid],
      R.indexBy(R.prop('guid'), R.path(['list'], state))
    )
  );
  G.setItemToLocalStorage('list', newList);

  return (
    P.$set('list', newList, state)
)};


export default createReducer({
  [A.createItemRequest]: createItemRequest,
  [A.deleteItemRequest]: deleteItemRequest,
  [A.getItemListRequest]: getItemListRequest
}, initialState);
