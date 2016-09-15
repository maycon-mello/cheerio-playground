import cheerio from 'cheerio';
import helpers from './helpers';

export default class Cheerio {

  static parse(sourceHtml, jsCode) {
    let error;
    let logs = [];
    let html;
    let cheerioEvalAddLog = (log) => logs.push(log.toString());

    jsCode = jsCode.replace(/console\.log/i, 'cheerioEvalAddLog');

    console.log(jsCode);

    try {
      let $ = cheerio.load(sourceHtml);

      // let global = { $, cheerio };
      // require('./helpers')(global);
      {
        eval(jsCode);
      }
      html = $.html();
    } catch (err) {
      error = err.toString();
    }
    console.log({html, error, logs});
    return {html, error, logs};
  }
}
