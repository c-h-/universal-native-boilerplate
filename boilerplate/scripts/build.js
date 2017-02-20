const gulp = require('gulp');
const gutil = require('gulp-util');

const buildAndroid = require('./helpers/buildAndroid');
const buildServer = require('./helpers/buildServer');
const buildWeb = require('./helpers/buildWeb');

/**
 * Build the project
 */
gulp.task('build', ['switch'], () => {
  return new Promise((resolve, reject) => {
    switch (global.settings.platform) {
      case 'android':
        buildAndroid(resolve, reject);
        break;
      case 'web':
        buildWeb(resolve, reject);
        break;
      case 'server': {
        global.settings.platform = 'web';
        buildWeb(() => {
          buildServer('build', resolve);
        }, reject);
        break;
      }
      case 'ios':
      case 'macos':
        gutil.log(gutil.colors.yellow('Please use XCode to complete the operation.'));
        resolve();
        break;
      case 'windows':
        gutil.log(gutil.colors.yellow('Please use Visual Studio to complete the operation.'));
        resolve();
        break;
      default:
        gutil.log(gutil.colors.yellow('Not yet implemented'));
        resolve();
    }
  });
});
