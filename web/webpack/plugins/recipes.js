const config = require('../config');
const pwaOptions = require('../pwaConfig');

const PUBLIC_PATH = config.PUBLIC_PATH;

/**
 * optional plugins enabled by enabling their recipe.
 * once enabled they succeed being required and get added to plugin list.
 * order them in the order they should be added to the plugin lists.
 */
const optionalPlugins = [
  {
    recipe: 'hints',
    name: 'preload-webpack-plugin',
    prodOnly: false,
    options: {
      rel: 'preload',
      as: 'script',
      include: 'all',
    },
  },
  {
    recipe: 'pwa',
    name: 'favicons-webpack-plugin',
    prodOnly: false,
    options: pwaOptions,
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
module.exports = optionalPlugins;
