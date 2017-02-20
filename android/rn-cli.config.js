/**
 * MANAGED BY BOILERPLATE
 * Makes different react native platforms play nice.
 */

const blacklist = require('react-native/packager/blacklist');

const config = {
  getBlacklistRE() {
    return blacklist([
      /node_modules\/react-native-macos\/.*/,
      /node_modules\/react-native-windows\/.*/,
    ]);
  },
};

module.exports = config;
