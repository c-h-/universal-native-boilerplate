const blacklist = require('react-native/packager/blacklist');

const config = {
  getBlacklistRE() {
    return blacklist();
  },
};

module.exports = config;
