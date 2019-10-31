import * as R from 'ramda';
import shortId from 'short-id';
import { history } from '../../router';
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
