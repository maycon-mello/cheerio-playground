import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import routes from './routes';
import configureStore from './store/configureStore';

import 'font-awesome/css/font-awesome.css';
import './style/style.global.scss';

const store = configureStore();

render(
  <Provider store={store} history={browserHistory}>
    <Router routes={routes} />
  </Provider>,
  document.getElementById('root')
);
