import { put } from 'redux-saga/effects';
import { history } from './router';
import * as C from './global/constants';
///////////////////////////////////////////////////////////////////////////////////////////////////
export const goToRoute = (route) => history.push(route);

// TODO: with profile
export const routesSagas = {
  ['/']: function* homeSaga() {
    yield put({ type: C.VISIT_HOME_PAGE });
    goToRoute(C.ROUTE_PATH_LIST)
  },
  [C.ROUTE_PATH_LIST]: function* listPageSaga() {
    yield put({ type: C.VISIT_EMP_LIST_PAGE });
  },
  [C.ROUTE_PATH_DETAILS]: function* detailPageSaga(payload) {
    yield put({
      id: payload.id,
      type: C.VISIT_DETAIL__PAGE,
      payload: C.ROUTE_PATH_DETAILS
    });
  },
};

export default routesSagas;
