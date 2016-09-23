import cheerio from 'cheerio';
import './helpers';

export default class Cheerio {

  static parse(sourceHtml, jsCode) {
    let error;
    let logs = [];
    let html;

    // Console log function
    let addLog = (...args) => {
      let log = '';
      args.forEach((obj) => { log += obj.toString() + ' '});
      logs.push(log);
    };

    jsCode = jsCode.replace(/console\.log/g, '___consoleLog');

    try {
      let $ = cheerio.load(sourceHtml);
      self.$ = $;

      exec(jsCode, addLog, $);

      html = $.html();
    } catch (err) {
      error = err.toString();
    }

    return {html, error, logs};
  }
}

function exec(___jsCode, ___consoleLog, $) {
  eval(___jsCode);
}
