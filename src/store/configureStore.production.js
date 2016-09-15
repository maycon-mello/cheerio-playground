import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import persistState from 'redux-localstorage';

const router = routerMiddleware(hashHistory);

const enhancer = compose(
  applyMiddleware(thunk, router),
  persistState()
);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
