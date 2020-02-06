import logger from 'redux-logger';
import { createStore as createReduxStore, applyMiddleware, compose } from 'redux';
// root
import rootReducer from './reducers';
/////////////////////////////////////////

let initialState = {};
let devToolsExtensionComposable = null;
// zalmoxisus/redux-devtools-extension
// https://github.com/zalmoxisus/redux-devtools-extension#implementation
if (window.devToolsExtension) {
  devToolsExtensionComposable = window.devToolsExtension();
}


export const createStore = (
  ...additionalMiddlewares) => {
  const middleWares = [
    logger,
    ...additionalMiddlewares,
  ];
  const composables = [applyMiddleware(...middleWares)];
  if (devToolsExtensionComposable) composables.push(devToolsExtensionComposable);
  const store = createReduxStore(
    rootReducer,
    initialState,
    compose(...composables)
  );

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(rootReducer(store.injectedReducers));
    });
  }
  return store;
};

export default createStore;
