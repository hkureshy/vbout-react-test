import { combineReducers } from 'redux';

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

const appReducer = combineReducers({});

export { rootReducer };
