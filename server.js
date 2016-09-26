const path = require('path');
const express = require('express');

const app = express();
const port = (process.env.PORT || 8080);
const indexFile = path.join(__dirname, './index.html');
const publicPath = express.static(path.join(__dirname, './static'));

app.use('/static', publicPath);
app.get('/', (_, res) => res.sendFile(indexFile));

if (process.env.NODE_ENV !== 'production') {
  require('./webpack/devServer.js')(app);
}

app.listen(port);

console.log(`Listening at http://localhost:${port}`);
