import cheerio from 'cheerio';
import helpers from './helpers';

export default class Cheerio {

  static parse(sourceHtml, jsCode) {
    let error;
    let logs = [];
    let html;
    let cheerioEvalAddLog = (log) => logs.push(log.toString());

    jsCode = jsCode.replace(/console\.log/g, 'cheerioEvalAddLog');

    try {
      let $ = cheerio.load(sourceHtml);

      let global = { $, cheerio };
      helpers(cheerio, global);
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
