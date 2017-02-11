const fs = require('fs-extra');
const gulp = require('gulp');
const gutil = require('gulp-util');
const path = require('path');
const shell = require('shelljs');

function runAndroid(resolve, reject) {
  const suffix = process.platform === 'win32' ? '.bat' : '';
  const cmd = path.join(process.cwd(), 'android', `gradlew${suffix}`);
  const mode = global.settings.release ? 'Release' : 'Debug';
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
      `app-${mode === 'Release' ? `${mode.toLowerCase()}-unsigned` : mode.toLowerCase()}.apk`
    );
    const pathToDest = path.join(
      process.cwd(),
      'build',
      'android',
      'apk',
      mode.toLowerCase(),
      `app${mode === 'Release' ? '-unsigned' : ''}.apk`
    );
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
  else {
    reject('Error in build');
  }
}

/**
 * Build the project
 */
gulp.task('build', ['switch'], () => {
  return new Promise((resolve, reject) => {
    switch (global.settings.platform) {
      case 'android':
        runAndroid(resolve, reject);
        break;
      default:
        gutil.log(gutil.colors.yellow('Not yet implemented'));
        resolve();
    }
  });
});
