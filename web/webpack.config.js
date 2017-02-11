const path = require('path');
const webpack = require('webpack');

module.exports = {
  devServer: {
    quiet: true,
    contentBase: path.join(process.cwd(), 'web', 'src'),
    port: process.env.PORT || 3000,
    host: 'localhost',
    colors: true,
    publicPath: '/',
    historyApiFallback: {
      index: '/index.html',
    },
    setup: (/* app */) => {
      // Here you can access the Express app object and add your own custom middleware to it.
      // For example, to define custom handlers for some paths:
      // app.get('/', (req, res) => {
      // });
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
  entry: [
    path.join(process.cwd(), 'index.web.js'),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        loader: 'url-loader',
        query: {
          name: '[name].[hash:16].[ext]',
        },
      },
    ],
  },
  output: {
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
  ],
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
  },
};
