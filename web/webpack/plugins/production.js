const webpack = require('webpack');

// plugins used in production
module.exports = [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
      negate_iife: false,
      screw_ie8: true,
      drop_console: true,
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
