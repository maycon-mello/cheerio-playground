import { expect } from 'chai';
import Cheerio from './index';

describe('Parsers', () => {
  describe('Cheerio', () => {
    it('should parse html code', () => {
      let source = `
        <div></div>
        <div></div>
      `;

      let output = `
        <div class="test"></div>
        <div class="test"></div>
      `;

      let js = `
        $('div').addClass('test');
      `;

      let cheerio = Cheerio.parse(source, js);

      expect(cheerio.html).equal(output);
      expect(cheerio.error).to.not.be.ok;
    });

    it('should return error due bad js syntax', () => {
      let source = `
        <div></div>
        <div></div>
      `;

      let js = `
        $.find('div').addClass('test');
      `;

      let cheerio = Cheerio.parse(source, js);

      expect(cheerio.error).to.be.ok;
    });
  });
});
