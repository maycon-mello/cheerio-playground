import cheerio from 'cheerio';
import helpers from './helpers';

export default class Cheerio {

  static parse(sourceHtml, jsCode) {
    let error;
    let html;

    try {
      let $ = cheerio.load(sourceHtml);
      // let global = { $, cheerio };
      // require('./helpers')(global);
      eval(jsCode);
      html = $.html();
    } catch (err) {
      error = err.toString();
    }

    return {html, error};
  }
}
