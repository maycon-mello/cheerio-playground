import cheerio from 'cheerio';
import helpers from './helpers';

export default class Cheerio {

  static parse(sourceHtml, jsCode) {
    let error;
    let logs = [];
    let html;

    // Console log function
    let cheerioEvalAddLog = (...args) => {
      let log = '';
      args.forEach((obj) => { log += obj.toString() + ' '});
      logs.push(log);
    }

    jsCode = jsCode.replace(/console\.log/g, 'cheerioEvalAddLog');

    try {
      let $ = cheerio.load(sourceHtml);
      self.$ = $;

      let global = { $, cheerio };

      helpers(cheerio, global);

      // Creating node global variables in Web Worker
      for (let key in global) {
        self[key] = global[key];
      }

      {
        eval(jsCode);
      }
      html = $.html();
    } catch (err) {
      error = err.toString();
    }

    return {html, error, logs};
  }
}
