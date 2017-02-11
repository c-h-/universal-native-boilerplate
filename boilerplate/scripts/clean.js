const gulp = require('gulp');
const path = require('path');
const rimraf = require('rimraf');
const shell = require('shelljs');

/**
 * Clean caches
 */
gulp.task('clean', [[
  'clean:boilerplate',
  'clean:npm',
  'clean:yarn',
]]);

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
 * Cleans NPM cache
 */
gulp.task('clean:npm', (callback) => {
  shell.exec('npm cache clean', {
    async: true,
  }, () => {
    callback();
  });
});

/**
 * Cleans Yarn cache
 */
gulp.task('clean:yarn', (callback) => {
  shell.exec('yarn cache clean', {
    async: true,
  }, () => {
    callback();
  });
});
