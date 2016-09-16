let directory = '../src';
let useSubdirectories = true;
let regExp = /\.spec\.js$/;

let context = require.context(directory, useSubdirectories, regExp);

context.keys().forEach(context);
