const fs = require('fs-extra');
const gutil = require('gulp-util');
const path = require('path');
const rimraf = require('rimraf');
const shell = require('shelljs');

function buildAndroid(resolve, reject) {
  const suffix = process.platform === 'win32' ? '.bat' : '';
  const cmd = path.join(process.cwd(), 'android', `gradlew${suffix}`);
  const mode = global.settings.production ? 'Production' : 'Debug';
  const code = shell.exec(`${cmd} assemble${mode}`, {
    cwd: path.join(process.cwd(), 'android'),
  }).code;
  if (code === 0) {
    // build succeeded, move to build folder
    const pathToApk = path.join(
      process.cwd(),
      'android',
      'app',
      'build',
      'outputs',
      'apk',
      `app-${mode === 'Production' ? `${mode.toLowerCase()}-unsigned` : mode.toLowerCase()}.apk`
    );
    const pathToDest = path.join(
      process.cwd(),
      'build',
      'android',
      'apk',
      mode.toLowerCase(),
      `app${mode === 'Production' ? '-unsigned' : ''}.apk`
    );
    // Remove last build
    rimraf(pathToDest.slice(0, pathToDest.lastIndexOf(path.sep)), (removeErr) => {
      if (removeErr) {
        reject(removeErr);
      }
      else {
        fs.copy(pathToApk, pathToDest, (err) => {
          if (err) {
            reject(err);
          }
          else {
            gutil.log(gutil.colors.green(`Copied build to: ${pathToDest}`));
            resolve();
          }
        });
      }
    });
  }
  else {
    reject('Error in build');
  }
}

module.exports = buildAndroid;
