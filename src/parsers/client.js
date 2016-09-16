/**
 * Web Worker client
 *
 */

const { host, protocol } = window.location;
const worker = new Worker(`${protocol}//${host}/static/parser.js`);


export function parse({ js, htmlSource }) {

  return new Promise((resolve, reject) => {
    worker.addEventListener('message', function (e) {
      let output = JSON.parse(e.data);
      resolve(output);
    }, false);

    worker.postMessage({ js, htmlSource });
  });
};
