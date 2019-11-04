import * as R from 'ramda';
import { createSelector } from 'reselect';
///////////////////////////////////////////////////////////////////////////////////////////////////

const selectStore = (state) => state;
const selectGlobalStore = (state) => state.global;

const makeSelectLocale = () => createSelector(
  selectStore,
  (global) => global.router,
);

const makeSelectSportTypes = () => createSelector(
  selectStore,
  (global) => {
    const options = R.map(
      ({ name, id }) => ({
        value: id,
        label: name,
      }),
      R.pathOr([], ['global', 'sportsType'], global)
    )
    return options;
  },
);

export {
  makeSelectLocale,
  selectGlobalStore,
  makeSelectSportTypes
};
