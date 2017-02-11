const gulp = require('gulp');
const shell = require('shelljs');

/**
 * Clean caches
 */
gulp.task('clean', [
  'clean:npm',
  'clean:yarn',
]);

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
