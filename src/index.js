import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import routes from './routes';
import configureStore from './store/configureStore';

import './style.global.css';

const store = configureStore();

render(
  <Provider store={store} history={hashHistory}>
    <Router routes={routes} />
  </Provider>,
  document.getElementById('root')
);
