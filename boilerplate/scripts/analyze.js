const gulp = require('gulp');
const gutil = require('gulp-util');
const open = require('open');
const path = require('path');
const runSequence = require('run-sequence');

/**
 * Perform analysis of a given platform
 */
gulp.task('analyze', (cb) => {
  // for web, get reports from pagespeed insights, lighthouse, and webpack visualizer.
  // for other platforms, show webpack visualizer report if web platform installed.

  global.settings.platform = 'web'; // switch to web platform
  global.settings.release = true;

  const tasks = ['analyze:weight'];
  if (global.settings.platform === 'web') {
  }
  runSequence('analyze:weight', cb);
});

/**
 * Analyze app bundle's weight
 */
gulp.task('analyze:weight', (cb) => {
  // 1. Visualizer
  let wp;
  try {
    wp = require('webpack');
  }
  catch (e) {
    gutil.log(gutil.colors.red('Web platform must be enabled for'
      + ' dependency weight visualization to be generated.'));
    gutil.log(gutil.colors.cyan('Run `gulp enable web` to install web platform.'));
    cb();
  }
  if (wp) {
    let vs;
    try {
      vs = require('webpack-visualizer-plugin');
    }
    catch (e) {
      gutil.log(gutil.colors.red('Visualize feature must be enabled for'
        + ' dependency weight visualization to be generated.'));
      gutil.log(gutil.colors.cyan('Run `gulp enable visualize` to install visualizer.'));
      cb();
    }
    if (vs) {
      // run visualization
      runSequence('build', 'analyze:weight:open-report');
    }
  }
});

/**
 * Open completed page weight report
 */
gulp.task('analyze:weight:open-report', (cb) => {
  open(path.join(process.cwd(), 'build', 'web', 'release', '__stats.html'));
  cb();
});
