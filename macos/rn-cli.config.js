const blacklist = require('react-native/packager/blacklist');

const config = {
  getBlacklistRE() {
    return blacklist([
      /node_modules\/react-native-windows\/.*/,
      /node_modules\/react-native\/.*/,
    ]);
  },
};

module.exports = config;
