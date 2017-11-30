/**
 * MANAGED BY BOILERPLATE
 * Makes different react native platforms play nice.
 */

const blacklist = require('metro-bundler/src/blacklist');

const config = {
  getBlacklistRE() {
    return blacklist([
      /node_modules\/react-native-windows\/.*/,
      /node_modules\/react-native\/.*/,
    ]);
  },
};

module.exports = config;
