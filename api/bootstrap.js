import glob from 'glob';

/**
 *
 *
 */
export default function (app) {
  glob
    .sync(__dirname + '/**/controller.js')
    .forEach(controller => {
      require(controller).default(app);
    });
}
