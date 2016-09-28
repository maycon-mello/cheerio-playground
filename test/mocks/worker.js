/**
 * Mock for Web Worker
 *
 */
import Cheerio from '../../app/parsers/cheerio';

export default class Worker {

  /**
   * @param {string} url
   */
  constructor(url) {
    this.listeners = [];
  }

  /**
   *
   * @param {string} htmlSource
   * @param {string} js code
   */
  postMessage({ htmlSource, js }) {
    let output = Cheerio.parse(htmlSource, js);

    let event = {
      data: JSON.stringify(output),
    }

    this.listeners.forEach(listener => listener(event));
  }

  /**
   *
   * @param {string} type
   * @param {function} listener
   */
  addEventListener(type, listener) {
    this.listeners.push(listener);
  }

}
