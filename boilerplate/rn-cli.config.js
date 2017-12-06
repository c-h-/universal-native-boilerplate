const blacklist = require('metro-bundler/src/blacklist');

const config = {
  getBlacklistRE() {
    return blacklist();
  },
};

module.exports = config;
