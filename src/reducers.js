import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
// features
import items from './features/item-list/reduser';
///////////////////////////////////////////////////////////////////////////////////////////////////

const appReducer = combineReducers({
  items
});

const rootReducer = (state, action) => {
  return appReducer(state, action)
};

export default rootReducer;
