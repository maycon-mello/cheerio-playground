import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import 'font-awesome/css/font-awesome.css';

import routes from './routes';
import configureStore from './store/configureStore';

import './style/style.global.scss';

const store = configureStore();

render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory}/>
  </Provider>,
  document.getElementById('root')
);
