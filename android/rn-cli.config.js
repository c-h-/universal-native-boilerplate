const blacklist = require('react-native/packager/blacklist');

const config = {
  getBlacklistRE() {
    return blacklist([
      /node_modules\/react-native-macos\/.*/,
    ]);
  },
};

module.exports = config;
