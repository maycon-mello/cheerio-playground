/**
 * @flow
 *
 * This is a client for parser web worker
 *
 */

const { host, protocol } = window.location;
const worker = new Worker(`${protocol}//${host}/static/parser.js`);

type parseArgs = {
  js: string;
  htmlSource: string;
}

export default class Client {

  static parse({ js, htmlSource }: parseArgs) {
    return new Promise((resolve) => {
      worker.addEventListener('message', (e: Object) => {
        let output = JSON.parse(e.data);
        resolve(output);
      }, false);

      worker.postMessage({ js, htmlSource });
    });
  }
}
