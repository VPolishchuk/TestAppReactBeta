import { put } from 'redux-saga/effects';
// global
import * as GC from './global/constants';
// helpers
import * as G from './global/helpers';
///////////////////////////////////////////////////////////////////////////////////////////////////

// TODO: with profile
export const routesSagas = {
  [GC.ROUTE_PATH_HOME]: function* homeSaga() {
    yield put({ type: GC.VISIT_HOME_PAGE });
    // G.goToRoute(GC.ROUTE_PATH_VENUES_LIST);
  },
  // [GC.ROUTE_PATH_PROFILE]: function* profileSaga() {
  //   yield put({
  //     type: GC.VISIT_PROFILE_PAGE,
  //     payload: GC.ROUTE_PATH_PROFILE
  //   });
  // },
  // [GC.ROUTE_PATH_PROFILE_EDIT]: function* profileEditSaga(payload) {
  //   yield put({
  //     type: GC.VISIT_PROFILE_EDIT,
  //     payload: GC.ROUTE_PATH_PROFILE_EDIT
  //   });
  // },
  // [GC.ROUTE_PATH_GAMES_LIST]: function* gamesListSaga() {
  //   yield put({
  //     type: GC.VISIT_GAMES_LIST_PAGE,
  //     payload: GC.ROUTE_PATH_GAMES_LIST
  //   });
  // },
  // [GC.ROUTE_PATH_VENUES_LIST]: function* venuesListSaga() {
  //   yield put({
  //     type: GC.VISIT_VENUES_LIST_PAGE,
  //     payload: GC.ROUTE_PATH_VENUES_LIST
  //   });
  // },
  // [GC.ROUTE_PATH_VENUE_DETAILS]: function* venueDetailsSaga() {
  //   yield put({
  //     type: GC.VISIT_VENUE_DETAILS,
  //     payload: GC.ROUTE_PATH_VENUE_DETAILS
  //   });
  // },
  // [GC.ROUTE_PATH_VENUE_EDIT]: function* venueSaga() {
  //   yield put({
  //     type: GC.VISIT_VENUE,
  //     payload: GC.ROUTE_PATH_VENUE_EDIT
  //   });
  // },
};

export default routesSagas;
