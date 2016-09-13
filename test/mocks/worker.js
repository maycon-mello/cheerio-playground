import Cheerio from '../../src/parsers/cheerio';

class Worker {

  constructor(url) {
    this.listeners = [];
  }

  postMessage({ htmlSource, js }) {
    let output = Cheerio.parse(htmlSource, js);

    let event = {
      data: JSON.stringify(output),
    }

    this.listeners.forEach(listener => listener(event));
  }

  addEventListener(type, listener) {
    this.listeners.push(listener);
  }

}

global.Worker = Worker;
