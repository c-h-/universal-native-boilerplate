const shell = require('shelljs');

function runStdPlatform(callback) {
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
