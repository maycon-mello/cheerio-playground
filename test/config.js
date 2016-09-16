import hook from 'css-modules-require-hook';
import sass from 'node-sass';
import './utils/browser';

hook({
  extensions: [ '.scss', '.css' ],
  preprocessCss: data => data,
});
