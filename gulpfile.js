const gulp = require('gulp');
const shell = require('shelljs');

/**
 * Setup the project by ejecting from original repository
 */
gulp.task('setup', [
  'setup:remove-git',
  'setup:init-git',
]);

/**
 * Remove original git repository
 */
gulp.task('setup:remove-git', (callback) => {
  shell.rm('-rf', '.git/');
  callback();
});

/**
 * Initialize a new git repository
 */
gulp.task('setup:init-git', (callback) => {
  shell.exec('git init && git add . && git commit -m "First commit :P"', {
    async: true,
  }, () => {
    callback();
  });
});
