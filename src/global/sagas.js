import * as R from 'ramda';
import {
  put,
  call,
  takeLatest } from 'redux-saga/effects';
// constants
import * as GC from '../global/constants';
// global
import * as G from '../global/helpers';
import { 
  setOpenLoader,
  setCloseLoader
} from '../components/common/loader/actions';
// utils
import { sendRequest } from '../utils/api';
import endpointsMap from '../utils/endpoints-map';
// auth
import * as A from './actions';
///////////////////////////////////////////////////////////////////////////////////

export function* handleGetSportsTypeRequest() {
  try {
    yield put(setOpenLoader());
    const token = G.getToken();
    const options = {
      headers: {
        "Authorization": token,
        'Content-Type': 'application/json',
      }
    };
    const res = yield call(sendRequest, 'get', `:1338/${endpointsMap.getSportTypes}`, options);
    if (G.isResponseSuccess(res.status, res.data)) {
      yield put(A.getSportsTypeSuccess(res.data.sportTypesData));
    } else {
      yield call(G.handleFailResponse, res, 'handleGetSportsTypeRequest');
    }
    yield put(setCloseLoader());
  } catch (error) {
    yield call(G.handleException, error, 'handleGetSportsTypeRequest');
    yield put(setCloseLoader());
  }
};

export function* handleVisitHomePageSaga() {
  while (true) {
    yield call(handleGetSportsTypeRequest);
    break;
  }
}

function* globalWatcherSaga() {
  yield takeLatest(GC.VISIT_HOME_PAGE, handleVisitHomePageSaga);
  yield takeLatest(A.getSportsTypeRequest, handleGetSportsTypeRequest);

}

export default globalWatcherSaga;
