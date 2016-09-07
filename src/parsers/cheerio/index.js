import cheerio from 'cheerio';
import helpers from './helpers';

export default class Cheerio {

  static parse(sourceHtml, jsCode) {
    let error;
    let outputHtml;

    try {
      let $ = cheerio.load(sourceHtml);

      // TODO: Use Web Workers to parse html code
      eval(jsCode);

      outputHtml = $.html();
    } catch (err) {
      error = err;
    }

    return {outputHtml, error};
  }
}
