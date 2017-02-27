const path = require('path');
const config = require('./webpack/config');
const plugins = require('./webpack/plugins');
const babelrc = require('./.babelrc');

const ENV = config.ENV;
const PUBLIC_PATH = config.PUBLIC_PATH;

module.exports = {
  devtool: ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
  devServer: {
    // https://webpack.js.org/configuration/dev-server/
    quiet: false,
    contentBase: path.join(process.cwd(), 'web', 'src'),
    port: process.env.PORT || 3000,
    host: 'localhost',
    publicPath: PUBLIC_PATH,
    historyApiFallback: {
      index: '/index.html',
    },
    open: true,
    proxy: {
      // OPTIONAL: proxy configuration:
      // '/optional-prefix/**': { // path pattern to rewrite
      //   target: 'http://target-host.com',
      //   pathRewrite: path => path.replace(/^\/[^\/]+\//, '')   // strip first path segment
      // }
    },
  },
  entry: {
    application: path.join(process.cwd(), 'index.web.js'),
    // libraries that don't change often and should be bundled externally
    vendor: [
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
    ],
  },
  output: {
    path: path.join(
      process.cwd(),
      'build',
      'web',
      ENV === 'production' ? 'production' : 'debug'
    ),
    publicPath: PUBLIC_PATH,
    filename: '[name].[hash].js',
  },
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
          path.resolve(process.cwd(), 'node_modules', 'react-navigation'),
          path.resolve(process.cwd(), 'node_modules', 'react-native-tab-view'),
          path.resolve(process.cwd(), 'js'),
          path.resolve(process.cwd(), 'index.web.js'),
        ],
        loader: 'babel-loader',
        query: babelrc,
      },
      // JSON
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      // Images
      // Inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'images/[name]_[hash:base64:5].[ext]',
        },
      },
      // Fonts
      // Inline base64 URLs for <=8k fonts, direct URLs for the rest
      {
        test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        include: path.join(process.cwd(), 'node_modules/react-native-vector-icons'),
        options: {
          limit: 8192,
          name: 'fonts/[name]_[hash:base64:5].[ext]',
        },
      },
    ],
  },
  plugins: (plugins.init).concat(ENV === 'production' ? plugins.production : plugins.dev),

  stats: {
    colors: true,
  },
};
