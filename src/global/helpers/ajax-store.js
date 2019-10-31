///////////////////////////////////////////////////////////////////////////////////////////////////
const qs = require('qs');
///////////////////////////////////////////////////////////////////////////////////////////////////

export const getToken = () => getSessionStorage().token;
export const clearSessionStore = () => sessionStorage.clear();
export const getSessionStorage = (itemName) => JSON.parse(sessionStorage.getItem(itemName));
export const parseQueryString = () => qs.parse(window.location.search, { ignoreQueryPrefix: true });
export const setSessionStorage = (itemName, itemValue) => sessionStorage.setItem(itemName, JSON.stringify(itemValue));
