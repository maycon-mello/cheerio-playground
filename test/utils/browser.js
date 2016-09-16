/**
 * Configuring jsdom and global variables
 *
 */
import { jsdom } from 'jsdom';
import localStorage from 'localStorage';
import Worker from '../mocks/worker';

global.document = jsdom('');
global.window = document.defaultView;
global.localStorage = localStorage;

const exposedProperties = ['window', 'navigator', 'document'];

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

global.Worker = Worker;
