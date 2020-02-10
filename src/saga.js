import { router } from 'redux-saga-router';
import { all, fork, put } from 'redux-saga/effects';
// root
import { history } from './router';
// constants
import routesSagas from './routes-saga';
// sagas
import empListWatcherSaga from './features/item-list/sagas';
// ///////////////////////////////////////////////////////////

export const BEFORE_ROUTE_CHANGE = 'BEFORE_ROUTE_CHANGE';

const options = {
	matchAll: true,
	* beforeRouteChange() {
		yield put({ type: BEFORE_ROUTE_CHANGE });
	},
};

export default function* mainSaga() {
	yield all([
		fork(empListWatcherSaga),
	]);
	yield fork(router, history, routesSagas, options);
};
