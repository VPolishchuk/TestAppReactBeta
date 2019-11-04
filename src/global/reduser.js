import * as P from 'plow-js';
import { createReducer } from 'redux-act';
// feature auth
import * as A from './actions';
//////////////////////////////////////////////

export const initialState = {
  sportsType: []
};

export const getSportsTypeSuccess = (state, data) => (
  P.$set('sportsType', data, state)
);

export default createReducer({
  [A.getSportsTypeSuccess]: getSportsTypeSuccess,
}, initialState);