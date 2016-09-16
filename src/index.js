import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import routes from './routes';
import configureStore from './store/configureStore';

import 'font-awesome/css/font-awesome.css';
import './style/style.global.scss';

const store = configureStore();

render(
  <Provider store={store} history={hashHistory}>
    <Router routes={routes} />
  </Provider>,
  document.getElementById('root')
);
