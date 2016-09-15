export const htmlSource =
`<html>
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
      <p>paragraph content</p>
    </div>
  </div>
</body>
</html>`;

export const js =
`$('body').find('li').addClass('test');
`;

export const htmlOutput = '';
