const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';

// plugins used in dev and production
const initPlugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(process.cwd(), './web/src/index.html'),
    minify: {
      collapseWhitespace: true,
      hash: true,
    },
  }),
];

// optional plugins. once installed they succeed being required and get added to plugin list.
let Visualizer;
try {
  Visualizer = require('webpack-visualizer-plugin');
}
catch (e) {
  console.info('Install visualizer with command `gulp enable visualizer`');
}

// add optional plugins to config
if (Visualizer) {
  initPlugins.push(new Visualizer({
    filename: './__stats.html',
  }));
}

module.exports = {
  devServer: {
    // https://webpack.js.org/configuration/dev-server/
    quiet: true,
    contentBase: path.join(process.cwd(), 'web', 'src'),
    port: process.env.PORT || 3000,
    host: 'localhost',
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
  entry: {
    application: path.join(process.cwd(), 'index.web.js'),
    vendor: [
      'react',
      'react-dom',
      'react-native-web',
      'animated',
    ],
  },
  resolve: {
    modules: [
      path.join(process.cwd(), 'node_modules'),
    ],
    alias: {
      'react-native': 'react-native-web',
    },
    extensions: ['.js', '.json'],
  },
  module: {
    loaders: [
      // JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
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
        options: {
          limit: 8192,
          name: 'fonts/[name]_[hash:base64:5].[ext]',
        },
      },
    ],
  },
  output: {
    path: path.join(
      process.cwd(),
      'build',
      'web',
      ENV === 'production' ? 'release' : 'debug'
    ),
    publicPath: '/',
    filename: '[name].[hash].js',
  },
  plugins: (initPlugins).concat(ENV === 'production' ? [
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

  node: {
    global: true,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false,
  },
};
