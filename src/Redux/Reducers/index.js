import { combineReducers } from 'redux';

import { changeReducer } from './Change';

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

const appReducer = combineReducers({
  changeReducer
});

export { rootReducer };
