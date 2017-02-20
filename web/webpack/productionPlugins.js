const webpack = require('webpack');

// plugins used in dev and production
module.exports = [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true,
    },
    output: {
      comments: false,
    },
    sourceMap: false,
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
];
