import { router } from 'redux-saga-router';
import { all, fork, call, put } from 'redux-saga/effects';
// root
import { history } from './router';
// constants
import routesSagas from './routes-saga';
import * as GC from './global/constants';
// sagas
// import globalWatcherSaga from './global/sagas';
// import loginWatcherSaga from './features/auth/sagas';
// import profileWatcherSaga from './features/profile/sagas';
// import gamesListWatcherSaga from './features/games-list/sagas';
// import venueListWatcherSaga from './features/vanues-list/sagas';
// ///////////////////////////////////////////////////////////

const options = {
	matchAll: true,
	* beforeRouteChange() {
		yield put({ type: GC.BEFORE_ROUTE_CHANGE });
	},
};

export default function* mainSaga() {
	yield all([
		// fork(loginWatcherSaga),
		// fork(globalWatcherSaga),
		// fork(profileWatcherSaga),
		// fork(venueListWatcherSaga),
		// fork(gamesListWatcherSaga),
	]);
	yield fork(router, history, routesSagas, options);
};
