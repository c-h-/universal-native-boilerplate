const gutil = require('gulp-util');
const shell = require('shelljs');

const tryPackage = require('./tryPackage');

function runStdPlatform(callback) {
  if (global.settings.platform === 'windows') {
    const enabled = tryPackage('react-native-windows');
    if (!enabled) {
      gutil.log(gutil.colors.red('Need Windows platform. Run `gulp enable windows`.'));
      callback();
      return;
    }
  }
  const hasYarn = false; // Yarn doesn't work!! shell.which('yarn');
  const suffix = global.settings.platform === 'macos' ? '-macos' : '';
  if (!shell.which(`react-native${suffix}`)) {
    shell.exec(hasYarn
      ? `yarn add -g react-native${suffix}-cli`
      : `npm i -g react-native${suffix}-cli`);
  }
  shell.exec(`react-native${suffix} run-${global.settings.platform}`);
  callback();
}

module.exports = runStdPlatform;
