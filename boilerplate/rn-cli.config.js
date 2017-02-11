const blacklist = require('react-native/packager/blacklist');

const config = {
  getBlacklistRE() {
    return blacklist([
      /node_modules\/my-package\/excluded-directory\/.*/,
    ]);
  },
};

module.exports = config;
