import * as R from 'ramda';
import {
  put,
  select,
  takeLatest } from 'redux-saga/effects';
import app from '../../firebase-config'
//
import {
  makeSelectLimitList,
  makeSelectLastVisible,
  makeSelectEmployeesList } from './selectors';
import * as A from './actions';
import * as C from '../../global/constants';
///////////////////////////////////////////////////////////////////////////////////

const db = app.firestore();

export function* handleDepartmentsListRequest() {
  try {
    const data = yield db.collection('departments').get();
    const departmentsData = data.docs.map(doc => ({...doc.data()}));
    yield put(A.getDepartmentsDataSuccess(departmentsData));
  } catch (error) {
    console.error(error)
  }
};


const getLimitData = async (data) => {
  const res = await data.get();
  let lastVisible = res.docs[res.docs.length-1];
  const employeesData = res.docs.map(doc => {
    let data = doc.data();
    if (R.has('empID', data) && R.isEmpty(data.empID)) {
      data = R.set(R.lensProp('empID'), doc.id, data);
    } else {
      data = R.assoc('empID', doc.id, data)
    }
    return ({...data})
  });
  return { employeesData, lastVisible: lastVisible.id }
};

export function* handleEmployeesListRequest({ payload = false }) {
  try {
    const limit = yield select(makeSelectLimitList());
    const employeesList = yield select(makeSelectEmployeesList());
    const lastVisible = yield select(makeSelectLastVisible());
    const data = yield payload ?
      db.collection('employees').orderBy("empName").startAfter(lastVisible).limit(limit) :
      db.collection('employees').orderBy("empName").limit(limit);
    const res = yield getLimitData(data);
    yield put(A.getEmployeesDataSuccess(res));
  } catch (error) {
    console.error(error)
  }
};

export function* handleDetailPageRequest({ payload }) {
  try {
    const data = yield db.collection('employees').doc(payload).get()
    yield put(A.getDetailPageSuccess(data.data()))
  } catch (error) {
    console.error(error)
  }
};

export function* handleVisitDetailPageSaga(payload) {
  while(true) {
    yield put(A.getDetailPageRequest(payload.id));
    break;
  }
}

export function* handleVisitEmployeesListSaga() {
  while(true) {
    yield put(A.getEmployeesDataRequest());
    yield put(A.getDepartmentsDataRequest());
    break;
  }
}

export function* empListWatcherSaga() {
  yield takeLatest(A.getEmployeesDataRequest, handleEmployeesListRequest);
  yield takeLatest(A.getDepartmentsDataRequest, handleDepartmentsListRequest);
  yield takeLatest(C.VISIT_EMP_LIST_PAGE, handleVisitEmployeesListSaga);
  yield takeLatest(C.VISIT_DETAIL__PAGE, handleVisitDetailPageSaga); 
  yield takeLatest(A.getDetailPageRequest, handleDetailPageRequest);
}

export default empListWatcherSaga;
