export const htmlSource = `
  <html>
  <head>
    <title> Tritium Tester </title>
  </head>
  <body>
    <div id="header">
      <img src="https://s3.amazonaws.com/moovweb-site-assets/logos/moovweb_small_cropped.jpg" alt="Logo" width="200px">
    </div>
    <div id="content">
      <ol>
        <li>Create</li>
        <li>Transform</li>
        <li>Publish</li>
      </ol>
      <div id="courses">
        <p>Check out our <a>tutorials</a> to start mobilizing your site today!</p>
      </div>
    </div>
  </body>
  </html>
`;

export const js = `
  $('body').find('li').addClass('test');
`;

export const htmlOutput = '<div>s</div>';
