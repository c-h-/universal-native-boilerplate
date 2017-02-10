const gulp = require('gulp');
const shell = require('shelljs');

/**
 * Setup the project by ejecting from original repository
 */
gulp.task('clean', [
  'clean:npm',
]);

/**
 * Initialize a new git repository
 */
gulp.task('clean:npm', (callback) => {
  shell.exec('npm cache clean', {
    async: true,
  }, () => {
    callback();
  });
});
