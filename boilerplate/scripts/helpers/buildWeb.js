const path = require('path');
const rimraf = require('rimraf');
const shell = require('shelljs');

function buildWeb(callback) {
  // Remove last build
  rimraf(path.join(
    process.cwd(),
    'build',
    'web',
    global.settings.production ? 'production' : 'debug'
  ), () => {
    shell.exec(`npm run build:${global.settings.production ? 'production' : 'debug'}:web`);
    callback();
  });
}

module.exports = buildWeb;
