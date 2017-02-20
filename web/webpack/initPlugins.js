const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

// plugins used in dev and production
module.exports = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(process.cwd(), './web/src/index.html'),
    minify: {
      collapseWhitespace: true,
      hash: true,
    },
  }),
];
