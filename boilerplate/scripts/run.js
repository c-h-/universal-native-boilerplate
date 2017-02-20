const gulp = require('gulp');
const gutil = require('gulp-util');
const runSequence = require('run-sequence');

const buildServer = require('./helpers/buildServer');
const runStdPlatform = require('./helpers/runStdPlatform');
const runWebPlatform = require('./helpers/runWebPlatform');
const tryPackage = require('./helpers/tryPackage');

/**
 * Run the project
 */
gulp.task('run', ['switch'], (callback) => {
  switch (global.settings.platform) {
    case 'web': {
      const enabled = tryPackage('webpack');
      if (enabled) {
        runWebPlatform(callback);
      }
      else {
        gutil.log(gutil.colors.red('Need web platform. Run `gulp enable web`.'));
        callback();
      }
      break;
    }
    case 'server': {
      global.settings.platform = 'web';
      runSequence('build', () => {
        global.settings.platform = 'server';
        buildServer('run', callback);
      });
      break;
    }
    default:
      runStdPlatform(callback);
  }
});
