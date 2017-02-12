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
      process.cwd(),
      global.settings.platform,
      'rn-cli.config.js'
    );
    pathExists(configPath).then((exists) => {
      const pathToUse = exists
        ? configPath
        : path.join(process.cwd(), 'boilerplate', 'rn-cli.config.js');
      const dest = path.resolve(process.cwd(), 'rn-cli.config.js');
      fs.copy(pathToUse, dest, { overwrite: true }, resolve);
    });
  });
});
