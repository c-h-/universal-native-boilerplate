const gulp = require('gulp');
const runSequence = require('run-sequence');

const buildServer = require('./helpers/buildServer');
const runStdPlatform = require('./helpers/runStdPlatform');
const runWebPlatform = require('./helpers/runWebPlatform');

/**
 * Run the project
 */
gulp.task('run', ['switch'], (callback) => {
  switch (global.settings.platform) {
    case 'web':
      runWebPlatform(callback);
      break;
    case 'server':
      global.settings.platform = 'web';
      runSequence('build', () => {
        global.settings.platform = 'server';
        buildServer('run', callback);
      });
      break;
    default:
      runStdPlatform(callback);
  }
});
