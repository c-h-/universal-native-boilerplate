const gutil = require('gulp-util');
const path = require('path');
const rimraf = require('rimraf');
const shell = require('shelljs');

const tryPackage = require('./tryPackage');

function buildWeb(callback) {
  const enabled = tryPackage('webpack');
  if (enabled) {
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
  else {
    gutil.log(gutil.colors.red('Need web platform. Run `gulp enable web`.'));
    callback();
  }
}

module.exports = buildWeb;
