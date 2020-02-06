import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
// features
import list from './features/item-list/reducer';
///////////////////////////////////////////////////////////////////////////////////////////////////

const appReducer = combineReducers({
  list,
  router
});

const rootReducer = (state, action) => {
  return appReducer(state, action)
};

export default rootReducer;
