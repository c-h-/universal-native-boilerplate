const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const config = require('../web/webpack/config');

const excludeLibs = [
  'express',
  'react',
  'react-dom',
  'react-native-web',
  'animated',
  'react-navigation',
  'lodash',
  'react-native-vector-icons',
  'react-redux',
  'redux',
  'react-native-i18n',
];

const ENV = config.ENV;
const PUBLIC_PATH = config.PUBLIC_PATH;

const nodeModules = {};
fs.readdirSync(path.join(process.cwd(), 'node_modules'))
  .filter((x) => {
    return excludeLibs.indexOf(x) > -1;
  })
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

module.exports = {
  devtool: ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
  entry: path.join(process.cwd(), 'server', 'src', 'app.js'),
  output: {
    path: path.join(
      process.cwd(),
      'build',
      'server',
      ENV === 'production' ? 'production' : 'debug'
    ),
    publicPath: PUBLIC_PATH,
    filename: '[name].js',
  },
  target: 'node',
  externals: nodeModules,
  resolve: {
    modules: [
      path.join(process.cwd(), 'node_modules'),
    ],
    alias: {
      'react-native': 'react-native-web',
    },
    extensions: ['.webpack.js', '.web.js', '.js', '.json'],
  },
  module: {
    loaders: [
      // JS
      {
        test: /\.js$/,
        include: [
          // add node_modules here that need to be transpiled
          path.resolve(process.cwd(), 'node_modules', 'react-native-i18n'),
          path.resolve(process.cwd(), 'node_modules', 'react-native-vector-icons'),
          path.resolve(process.cwd(), 'js'),
          path.resolve(process.cwd(), 'server', 'src'),
        ],
        loader: 'babel-loader',
        query: {
          babelrc: false,
          cacheDirectory: true,
          plugins: [
            // optimizes react components
            'transform-react-inline-elements',
          ],
          presets: [
            [
              'es2015',
              {
                modules: false,
              },
            ],
            'stage-0',
            // use react preset so we can get tree shaking
            'react',
          ],
        },
      },
      // JSON
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  plugins: ([
    new webpack.IgnorePlugin(/\.(woff|woff2|ttf|eot|png|jpg|jpeg|gif|svg)$/),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ]).concat(ENV === 'production' ? [
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
  ] : []),

  stats: {
    colors: true,
  },
};
