import Cheerio from './cheerio';

self.addEventListener('message', function (e) {
  let { js, htmlSource } = e.data;

  let output = Cheerio.parse(htmlSource, js);

  let jsonOutput = JSON.stringify(output);
  self.postMessage(jsonOutput);
}, false);
