const path = require('path');

module.exports = {
  entry: path.join(__dirname, '_webpack', 'js', 'main'),
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'assets/js'),
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
  },
};
