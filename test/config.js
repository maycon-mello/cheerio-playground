import hook from 'css-modules-require-hook';

import { Request } from './api/request';
import './utils/browser';

hook({
  extensions: [ '.scss', '.css' ],
  preprocessCss: data => data,
});

global.Request = Request;
