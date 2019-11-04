import React from 'react';
import * as R from 'ramda';
import moment from 'moment';
import shortId from 'short-id';
import { history } from '../../router';
// constants
import * as GC from '../constants';
// ui
import { Box } from '../../ui';
// /////////////////////////////////////////////////////////////////////////////////////////////////

// ADDITION RAMDA HELPERS
export const isTrue = R.equals(true);
export const isFalse = (value) => R.equals(value, false);
export const isNot = R.complement(R.is);
export const isNotNil = R.complement(R.isNil);
export const notEquals = R.complement(R.equals);
export const isNotEmpty = R.complement(R.isEmpty);
export const notContain = R.complement(R.contains);
export const isNaN = R.equals(NaN);
export const isNotNaN = notEquals(NaN);
export const notHas = R.complement(R.has);
export const isNotNilAndNotEmpty = (value) => R.and(isNotNil(value), isNotEmpty(value));
export const isNilOrEmpty = (value) => R.or(R.isNil(value), R.isEmpty(value));
export const isZero = (value) => R.equals(value, 0);
export const isNotZero = (value) => notEquals(value, 0);
export const isNilOrZero = (value) => R.or(R.isNil(value), isZero(value));
export const isNotNilAndNotZero = (value) => R.and(isNotNil(value), isNotZero(value));
export const mapIndexed = R.addIndex(R.map);
export const isAllTrue = (...arg) => R.all(isTrue, arg);
export const isAllFalse = (...arg) => R.all(isFalse, arg);
export const isAllNilOrEmpty = R.all(isNilOrEmpty);
export const isAllNotNilOrNotEmpty = R.all(isNotNilAndNotEmpty);
export const isAnyNilOrEmpty = R.any(isNilOrEmpty);
export const isOneNotNilOrNotEmpty = R.any(isNotNilAndNotEmpty);
export const isFunction = R.is(Function);
export const isObject = R.is(Object);
export const isArray = R.is(Array);
export const isBoolean = R.is(Boolean);
export const isString = R.is(String);
export const isNumber = R.is(Number);

export const getItemFromLocalStorage = (itemName) => JSON.parse(localStorage.getItem(itemName));
export const setItemToLocalStorage = (itemName, itemValue) => localStorage.setItem(itemName, JSON.stringify(itemValue));

export const genShortId = () => shortId.generate();

export const ifElse = (predicate, ifSt, elseSt) => {
  if (predicate) return ifSt;
  return elseSt;
};

export const goToRoute = (route) => history.push(route);

export const shouldReturn = (willExportPDF, content) => {
  if (willExportPDF) {
    return null;
  }
  return content;
};
// //////////////////////////////////////////////////////////////////////////////
export const getCurrentDate = () => moment().format();
export const getCurrentDateWithFormat = (format) => moment().format(format);

export const isValidMoment = (item) => (
  moment(item).isValid()
);

export const renameKeys = R.curry((keysMap, obj) => R.reduce(
  (acc, key) => R.assoc(R.or(keysMap[key], key), obj[key], acc),
  {},
  R.keys(obj),
));

export const addMomentTime = (
  item,
  interval = 0,
  type = 'hours',
) => {
  if (isValidMoment(item)) return moment(item).add(interval, type).format();
  return item;
};

export const getOrElse = (obj, prop, elseSt) => {
  if ((isNotNil(obj) && isNotNil(obj[prop]))) {
    return obj[prop];
  }
  return elseSt;
};

export const createLocalDateTimeFromInstanceOrISOString = (item, format) => (
  moment(item).format(format)
);

export const createUnixTimeFormat = (item) => (
  moment(item).unix()
);

// popup shadows on get a quote form
const shadowColors = {
  redShadow: '0 2px 30px 0 rgba(244, 74, 74, 0.5)',
  blueShadow: '0 2px 30px 0 rgba(37, 90, 178, 0.5)',
  greenShadow: '0 2px 30px 0 rgba(31, 189, 110, 0.5)',
  focusShadow: '0 2px 30px 0 rgba(0, 86, 229, 0.5)',
};

export const renderShadow = (props) => {
  let shadowName = 'blueShadow'
  if (props.isValid) {
    shadowName = 'greenShadow';
  } else {
    const touched = props.fields.some((item) => (
      props.touched[item.name]
    ));
    const withErrorAndTouched = props.fields.some((item) => (
      R.and(props.errors[item.name], props.touched[item.name])
    ));
    const withError = props.fields.some((item) => (
      props.errors[item.name]
    ));
    if (withErrorAndTouched) {
      shadowName = 'redShadow'
    } else if (withError) {
      shadowName = 'blueShadow'
    } else if (touched) {
      shadowName = 'greenShadow'
    }
  }
  return shadowColors[shadowName];
};

export const checkStatusColor = {
  [GC.STATUS_APPROVED]: <Box fontWeight='bold' color='#27AE60' textAlign='center'>Approved</Box>,
  [GC.STATUS_SUSPENDED]: <Box fontWeight='bold' color='#EB5757' textAlign='center'>Suspended</Box>,
  [GC.STATUS_PENDING_REVIEW]: <Box fontWeight='bold' color='#F2994A' textAlign='center'>Pending Review</Box>,
};

export const splitTime = (time) => {
  if (isNilOrEmpty(time)) return null;
  const timeArr = R.split(' ', time);
  const hoursAndMinutes =  R.split(':', timeArr[0]);
  if (R.lte(hoursAndMinutes[0], 9)) {
    return `0${timeArr[0]}`
  }
  if (R.and(R.gte(hoursAndMinutes[0], 10), R.lte(hoursAndMinutes[0], 12)))  {
    return `${timeArr[0]}`
  }
  return `12 + ${hoursAndMinutes[0]}:${hoursAndMinutes[1]}`
};

export const convertTime = (time) => {
  if (!time) return null;
  return  (
    moment.unix(time).format('LT')
    // moment.unix(time).format('MMMM Do YYYY, h:mm a')
  );
}
export const checkColorBg = (x) => {
  if (Number.isInteger(R.divide(x, 2))) {
    return '#F1F1F3';
  }
  return '#fff';
};
/////////////////////////////////////////////////////////////////////////////////////////////

// export const getChargeFieldNameFromChargeFieldKey = (keyToField: string) => (
//   R.compose(
//     R.last(),
//     R.split('.'),
//   )(keyToField)
// );

// export const getPathToChargeFromChargeFieldKey = (keyToField: string) => {
//   const chargeFieldName = getChargeFieldNameFromChargeFieldKey(keyToField);
//   const path = replace(keyToField, chargeFieldName, ' ');
//   return trimRight(path, '. ');
// };

export const replaceKeysToParams = (options, endpoint) => {
  debugger;
  // if (R.is(String, options)) {
  //   return R.replace(/:[^/]*/, options, endpoint);
  // } else if (R.is(Object, options)) {
  //   let newEndpoint = endpoint;
  //   R.forEachObjIndexed((item: string, key: string) => {
  //     const regKey = new RegExp(`:${key}`, 'g');
  //     newEndpoint = R.replace(regKey, item, newEndpoint);
  //   }, options);
  //   return newEndpoint;
  // }
  return endpoint;
};