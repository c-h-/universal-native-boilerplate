const fs = require('fs-extra');
const gulp = require('gulp');
const path = require('path');
const pathExists = require('path-exists');

/**
 * Switch configurations
 */
gulp.task('switch', () => {
  return new Promise((resolve) => {
    const configPath = path.resolve(
      __dirname,
      '..',
      '..',
      global.settings.platform,
      'rn-cli.config.js'
    );
    pathExists(configPath).then((exists) => {
      const pathToUse = exists ? configPath : path.resolve(__dirname, '..', 'rn-cli.config.js');
      const dest = path.resolve(__dirname, '..', '..', 'rn-cli.config.js');
      fs.copy(pathToUse, dest, { overwrite: true }, resolve);
    });
  });
});
