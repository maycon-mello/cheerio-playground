
global.cheerio = require('cheerio');

require('./helpers');

let $ = cheerio.load(`
  <div>
    Text1<br/>
    Text2<br/>
    Text3<br/>
  </div>
`);

let elements = $('div')
  .wrapTextChildren('span', { class: 'my-class' })
  .find('span');

elements.each((idx, item) => {
  if (idx === elements.length - 1) {
    $(item).addClass('bbb');
  }
});

console.log($.html());
