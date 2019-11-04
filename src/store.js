import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
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
  mainSaga,
  ...additionalMiddlewares) => {
  const sagaMiddleware = createSagaMiddleware();
  const middleWares = [
    logger,
    sagaMiddleware,
    ...additionalMiddlewares,
  ];
  const composables = [applyMiddleware(...middleWares)];
  if (devToolsExtensionComposable) composables.push(devToolsExtensionComposable);
  const store = createReduxStore(
    rootReducer,
    initialState,
    compose(...composables)
  );
  const sagas = [
    mainSaga,
  ];
  sagas.forEach((saga) => sagaMiddleware.run(saga));
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(rootReducer(store.injectedReducers));
    });
  }
  return store;
};

export default createStore;
