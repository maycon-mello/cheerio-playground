import cheerio from 'cheerio';
import helpers from './helpers';

export default class Cheerio {

  static parse(sourceHtml, jsCode) {
    let error;
    let html;

    try {
      let $ = cheerio.load(sourceHtml);

      // TODO: Use Web Workers to parse html code
      eval(jsCode);

      html = $.html();
    } catch (err) {
      error = err;
    }

    return {html, error};
  }
}
