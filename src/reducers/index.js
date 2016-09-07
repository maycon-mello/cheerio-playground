import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import code from './code';
import logs from './logs';

const rootReducer = combineReducers({
  code,
  logs,
  routing
});

export default rootReducer;
