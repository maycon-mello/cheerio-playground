import { jsdom } from 'jsdom';
import hook from 'css-modules-require-hook';
import sass from 'node-sass';
import localStorage from 'localStorage';

const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
global.localStorage = localStorage;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
  platform: 'linux',
  appName: '',
};

hook({
  extensions: [ '.scss' ],
  preprocessCss: data => data,
});

require('./mocks/worker.js');
