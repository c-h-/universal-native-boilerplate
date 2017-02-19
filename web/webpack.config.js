const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';

const PUBLIC_PATH = '/';

// plugins used in dev and production
const initPlugins = [
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
const devPlugins = [
  // new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
];
const productionPlugins = [
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

/**
 * optional plugins.
 * once enabled they succeed being required and get added to plugin list.
 * order them in the order they should be added to the plugin lists.
 */
const optionalPlugins = [
  {
    recipe: 'hints',
    name: 'resource-hints-webpack-plugin',
    prodOnly: false,
  },
  {
    recipe: 'pwa',
    name: 'favicons-webpack-plugin',
    prodOnly: false,
    options: {
      // (see https://github.com/haydenbleasel/favicons#usage)
      appName: 'UniversalNativeBoilerplate', // Your application's name. `string`
      appDescription: null,           // Your application's description. `string`
      developerName: 'Charlie Hulcher', // Your (or your developer's) name. `string`
      developerURL: 'https://charlie.engineer', // Your (or your developer's) URL. `string`
      background: '#fff',             // Background colour for flattened icons. `string`
      theme_color: '#ccc',         // Theme color for browser chrome
      path: '/',                      // Path for overriding default icons path. `string`
      display: 'standalone',          // Android display: 'browser' or 'standalone'. `string`
      orientation: 'portrait',        // Android orientation: 'portrait' or 'landscape'. `string`
      start_url: `${PUBLIC_PATH}?homescreen=1`, // Android start application's URL. `string`
      logging: false,                 // Print logs to console? `boolean`
      online: false,                  // Use RealFaviconGenerator to create favicons? `boolean`
      preferOnline: false,            // Use offline generation, if online has failed. `boolean`

      // Your source logo
      logo: path.join(process.cwd(), 'web', 'src', 'img', 'icon.png'),
      // The prefix for all image files (might be a folder or a name)
      prefix: 'icons/',
      // Emit all stats of the generated icons
      emitStats: false,
      // The name of the json containing all favicon information
      statsFilename: 'iconstats-[hash].json',
      // Generate a cache file with control hashes and
      // don't rebuild the favicons until those hashes change
      persistentCache: false,
      // Inject the html into the html-webpack-plugin
      inject: true,

      // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: true,
        twitter: true,
        yandex: false,
        windows: true,
      },
    },
  },
  {
    recipe: 'visualizer',
    name: 'webpack-visualizer-plugin',
    prodOnly: false,
    options: {
      filename: '../bundle_weight_report.html',
    },
  },
  {
    recipe: 'optimize',
    name: 'optimize-js-plugin',
    prodOnly: true,
    options: {
      sourceMap: false,
    },
  },
  {
    recipe: 'offline',
    name: 'offline-plugin',
    prodOnly: true,
    options: {
      relativePaths: false,
      AppCache: false,
      ServiceWorker: {
        events: true,
      },
      publicPath: PUBLIC_PATH,
      caches: 'all',
    },
  },
];
optionalPlugins.forEach((pluginDef) => {
  let Plugin = null;
  try {
    Plugin = require(pluginDef.name); // eslint-disable-line
  }
  catch (e) {
    console.info(`Tip: Install ${pluginDef.name} with command 'gulp enable ${pluginDef.recipe}'`);
  }
  if (Plugin) {
    const list = pluginDef.prodOnly ? productionPlugins : initPlugins;
    list.push(new Plugin(pluginDef.options));
  }
});

module.exports = {
  devtool: ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
  devServer: {
    // https://webpack.js.org/configuration/dev-server/
    quiet: false,
    contentBase: path.join(process.cwd(), 'web', 'src'),
    port: process.env.PORT || 3000,
    host: 'localhost',
    // hot: true,
    publicPath: PUBLIC_PATH,
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
    // [
    //   // 'react-hot-loader/patch',
    //   // 'webpack-dev-server/client?http://localhost:3000',
    //   // 'webpack/hot/only-dev-server',
    //   path.join(process.cwd(), 'index.web.js'),
    // ],
    vendor: [
      'react',
      'react-dom',
      'react-native-web',
      'animated',
      'react-navigation',
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
        // exclude: /node_modules\/(?!(react-native-vector-icons|react-native-i18n\/).*/,
        include: [
          path.resolve(process.cwd(), 'node_modules', 'react-native-i18n'),
          path.resolve(process.cwd(), 'node_modules', 'react-native-vector-icons'),
          path.resolve(process.cwd(), 'js'),
          path.resolve(process.cwd(), 'index.web.js'),
        ],
        loader: 'babel-loader',
        query: {
          babelrc: false,
          cacheDirectory: true,
          plugins: [
            // optimizes react components
            'transform-react-inline-elements',

            // hot module reloading
            // 'react-hot-loader/babel',
          ],
          presets: [
            [
              'es2015',
              {
                modules: false,
              },
            ],
            'stage-0',
            // use react preset so we can get properly working tree shaking
            'react',
          ],
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
        include: path.join(process.cwd(), 'node_modules/react-native-vector-icons'),
        options: {
          limit: 8192,
          name: 'fonts/[name]_[hash:base64:5].[ext]',
        },
      },
    ],
  },
  plugins: (initPlugins).concat(ENV === 'production' ? productionPlugins : devPlugins),

  stats: {
    colors: true,
  },
};
