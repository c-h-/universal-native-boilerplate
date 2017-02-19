const gulp = require('gulp');
const path = require('path');
const rimraf = require('rimraf');
const runSequence = require('run-sequence');
const shell = require('shelljs');

/**
 * Clean caches
 */
gulp.task('clean', (callback) => {
  runSequence([
    'clean:boilerplate',
    'clean:watchman',
    'clean:npm',
  ], callback);
});

/**
 * Cleans Boilerplate cache
 */
gulp.task('clean:boilerplate', () => {
  return new Promise((resolve, reject) => {
    rimraf(path.join(process.cwd(), 'build'), (err) => {
      if (err) {
        reject(err);
      }
      else {
        resolve();
      }
    });
  });
});

/**
 * Cleans Watchman cache
 */
gulp.task('clean:watchman', (callback) => {
  shell.exec('watchman watch-del-all', {
    async: true,
  }, () => {
    callback();
  });
});

/**
 * Cleans NPM cache
 */
gulp.task('clean:npm', (callback) => {
  shell.exec('npm cache clean', {
    async: true,
  }, () => {
    callback();
  });
});
