import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import code from './code';

const rootReducer = combineReducers({
  code,
  routing
});

export default rootReducer;
