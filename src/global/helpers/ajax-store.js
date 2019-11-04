import * as R from 'ramda';
import { toast } from 'react-toastify';
import { all, call, select } from 'redux-saga/effects';
// features
// import { handleLogoutRequest } from '../../features/auth/sagas';
// global
import * as GC from '../constants';
import { isNotNil, isNotNilAndNotEmpty } from './common';
///////////////////////////////////////////////////////////////////////////////////////////////////
const qs = require('qs');
///////////////////////////////////////////////////////////////////////////////////////////////////

export const clearSessionStore = () => sessionStorage.clear();
export const getSessionStorage = () => JSON.parse(sessionStorage.getItem('authToken'));
export const setSessionStorage = (itemName, itemValue) => sessionStorage.setItem(itemName, JSON.stringify(itemValue));
export const getToken = () => getSessionStorage().token;
export const parseQueryString = () => qs.parse(window.location.search, { ignoreQueryPrefix: true });

export const getMockResponse = (status, data) => ({
  status,
  data,
});

export const handleItemInfo = (item) => (
  toast.info(item.join(', '))
);

// Use with sagas
export function* showToastrMessage(type, message) {
  const msg = message;
  toast[type](msg);
}

// Use with wait/async
export const showToastrMessageSimple = (type, message) => toast[type](message);

export function isResponseSuccess(status, data = {}, msg, partialSuccessMsg = '') {
  const { message } = data;
  if (R.and(R.gte(status, 200), R.lt(status, 300))) {
    switch (status) {
      case 200: {
        if (isNotNilAndNotEmpty(message)) {
          showToastrMessageSimple('success', message);
        }
        break;
      }
      case 202: {
        if (isNotNilAndNotEmpty(data.errors)) {
          showToastrMessageSimple(
            'success',
            `${R.values(data.errors).join(', ')}: ${partialSuccessMsg}`,
          );
        } else {
          R.values(data).forEach(handleItemInfo);
        }
        break;
      }
      default: {
        break;
      }
    }
    return true;
  }
  return false;
}

export const logError = (msg, error) => {
  console.error(`============================== ${msg} ==============================`, error);
};

export const captureException = (exc, msg) => {
  return Raven.captureException(exc, { extra: { msg } }) // eslint-disable-line
};

export const captureMessage = (status, msg, data, level = 'info') => {
  // if (isProduction) {
  //   // TODO: check Raven
  //   // Raven.captureMessage(`${status}-${msg}`, { level, extra: { data } }) // eslint-disable-line
  // }
};

function* showValidationErrors(data) {
  const { message, error } = data;
  if (isNotNil(error)) {
    yield all(
      R.toPairs(error).map((field) => (
        call(showToastrMessage, 'error', `${field[0]}: ${field[1]}`)
      )),
    );
  } else {
    yield call(showToastrMessage, 'error', message);
  }
}

export const handleException = (exc, msg) => {
  if (exc instanceof ReferenceError) {
    captureException('exeption', msg);
    logError(msg, 'exeption');
  } else {
    captureException(exc, msg);
    logError(msg, exc);
  }
};

// Use with sagas
// REFACTOR: with less complexity
export function* handleFailResponse(
  res,
  msg,
  showMsg = true,
  clearConsole = false,
) {
  const { status, data } = res;
  const { message } = data;
  switch (status) {
    case 400: {
      if (showMsg) {
        yield call(showValidationErrors, data);
      }
      logError(status, data);
      break;
    }
    case 401: {
      if (showMsg) {
        yield call(showToastrMessage, 'error', R.or(message, 'Sorry, authorization error.'));
        // yield call(handleLogoutRequest);
      }
      logError(status, data);
      break;
    }
    case 402: {
      if (showMsg) {
        switch (data) {
          default: {
            yield call(showToastrMessage, 'error', R.or(message, `Oops! Ask the system admin for help.`));
            break;
          }
        }
      }
      logError(status, data);
      break;
    }
    case 403: {
      if (showMsg) {
        yield call(showToastrMessage, 'error', R.or(message, 'Sorry, you can not access'));
      }
      logError(status, data);
      break;
    }
    case 404: {
      if (showMsg) {
        yield call(showToastrMessage, 'error', R.or(message, 'Sorry, not found'));
      }
      logError(status, data);
      break;
    }
    case 422: {
      if (showMsg) {
        yield call(showToastrMessage, 'error', R.or(message, 'Oops! The system is experiencing a problem. The issue has been reported.'));
      }
      logError(status, data);
      captureMessage(status, msg, data, 'warning');
      break;
    }
    case 500: {
      if (showMsg) {
        yield call(showToastrMessage, 'error', R.or(message, 'Oops! The system is experiencing a problem. The issue has been reported.'));
      }
      logError(status, data);
      captureMessage(status, msg, data, 'warning');
      break;
    }
    default: {
      if (showMsg) {
        yield call(showToastrMessage  , 'error', R.or(message, 'Oops! The system is experiencing a problem. The issue has been reported.'));
      }
      logError(status, data);
      captureMessage(status, msg, data, 'warning');
      break;
    }
  }
  if (R.and(clearConsole)) {
    console.clear();
  }
}
