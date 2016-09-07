module.exports = {
     entry: './index.js',
     output: {
         path: './',
         filename: 'app.bundle.js'
     },
     module: {
        loaders: [{
            test: /\.json?$/,
            loader: 'json-loader',
        }]
    }
 };