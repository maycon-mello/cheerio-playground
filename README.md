# Cheerio Playground
This playground provide code editors to run transformations on a html source and display the result on the fly.

## How it works
It use a html source and apply transformations using [cheerio](https://cheerio.js.org/), the transformation process runs in a Web Worker.

## Heroku app
[Click here](https://cheerio-playground.herokuapp.com/) and enjoy!

### Installation
```sh
$ npm install
```

### Running
```sh
$ npm start
```

### Tests
This app uses mocha to perform tests, you can run unit tests with:
```sh
$ npm test
```
or run with karma:
```sh
$ npm run test:karma
```

### Contribute
Feel free to contribute adding new features or creating issues.
