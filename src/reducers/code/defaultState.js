export const htmlSource =
`<!--
 Edit this code or paste some html markup here.
 The application state persists in localStorage, so you don't lost your code
 after closing the browser.
-->
<html>
  <head>
    <title>Cheerio Playground</title>
  </head>
  <body>
    <h1>Cheerio</h1>
    <div id="content">
      <ol>
        <li>Create</li>
        <li>Transform</li>
        <li>Publish</li>
      </ol>
      <div id="courses">
        <p>Paragraph content</p>
      </div>
    </div>
    <table>
      <tbody>
        <tr>
          <td>Table cell</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>`;

export const js =
`/**
 * Edit this js to perform transformation on the html structure
 * This playground include helpers with functions like
 * wrapTextChildren, dumpTable...
 */
const $body = $('body');

// Creating and inserting a new element on the body
const myDiv = $(tag('div', {class: 'my-div'}, 'My new Div'));
$body.append(myDiv);

let listItems = $body.find('li').addClass('test-class');

// Logs example
console.log("Using logs to debug, to see it click in the logs button");
console.log(myDiv);
console.log('List items found: ', listItems.length);

// Dump tables
$body.find('table').dumpTable();

// Functions usage
function removeListItem(idx) {
 $body.find('#content li').eq(idx).remove();
}

removeListItem(0);
`;

export const htmlOutput = '';
