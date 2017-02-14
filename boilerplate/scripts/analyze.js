const gulp = require('gulp');
const gutil = require('gulp-util');
const path = require('path');
const runSequence = require('run-sequence');

// server port
const port = 3000;

// optional requires
let ngrok;
let open;
let psi;
let vs;
let wp;

let site = '';
const queuedPostRunArgs = [];

/**
 * Runs page speed insights analysis
 */
function runPageSpeed(strategy, cb) {
  psi.output(site, {
    nokey: 'true',
    strategy: strategy,
    threshold: 1,
  }).then(cb, cb);
}

/**
 * Shared startServer function ensures the server starts if
 * any analyze action succeeds in passing verification.
 * Once finished starting it runs the tasks passed to it.
 */
function startServer(tasksToRun, callback) {
  global.settings.platform = 'web'; // switch to web platform
  global.settings.release = true; // set to release mode
  let serverStarted = false;
  let serverFinished = false;
  if (!serverStarted) {
    serverStarted = true;
    queuedPostRunArgs.push([tasksToRun, callback]);
    runSequence('run', () => { // build and run project
      // server is started
      // now we want to call all tasks passed in
      // and callbacks when they complete
      serverFinished = true;
      const runInParallel = [];
      queuedPostRunArgs.forEach((args) => {
        const tasksToRunInParallel = args[0];
        (
          Array.isArray(tasksToRunInParallel)
          ? tasksToRunInParallel
          : [tasksToRunInParallel]
        ).forEach(task => runInParallel.push(task));
      });
      runSequence('analyze:serve', runInParallel, () => {
        // wrapped all analysis, finish
        queuedPostRunArgs.forEach((args) => {
          const cb = args[1];
          if (typeof cb === 'function') {
            cb();
          }
        });
      });
    });
  }
  else if (!serverFinished) {
    queuedPostRunArgs.push([tasksToRun, callback]);
  }
  else {
    runSequence(tasksToRun, callback);
  }
}

/**
 * Perform analysis of a given platform
 */
gulp.task('analyze', (cb) => {
  // for web, get reports from pagespeed insights, lighthouse, and webpack visualizer.
  // for other platforms, show webpack visualizer report if web platform installed.

  const tasks = ['analyze:weight'];
  if (global.settings.platform === 'web') {
    tasks.push('analyze:external');
  }
  runSequence(tasks, cb);
});

/**
 * Tunnel locally hosted site
 */
gulp.task('analyze:serve', (cb) => {
  ngrok.connect(port, (err, url) => {
    site = url;
    cb();
  });
});

/**
 * Run page speed insights
 */
gulp.task('analyze:external', (cb) => {
  try {
    ngrok = require('ngrok'); // eslint-disable-line
  }
  catch (e) {
    gutil.log(gutil.colors.red('Analyze feature must be enabled for'
      + ' pagespeed and lighthouse analysis to be generated.'));
    gutil.log(gutil.colors.cyan('Run `gulp enable analyze` to install dependencies.'));
  }
  if (ngrok) {
    runSequence(
      'analyze:serve',
      [ // parallelize analysis
        'analyze:external:pagespeed',
        'analyze:external:lighthouse',
      ],
      cb
    );
  }
});

/**
 * Run page speed insights
 */
gulp.task('analyze:external:pagespeed', (cb) => {
  try {
    psi = require('psi'); // eslint-disable-line
  }
  catch (e) {
    gutil.log(gutil.colors.red('Analyze feature must be enabled for'
      + ' pagespeed and lighthouse analysis to be generated.'));
    gutil.log(gutil.colors.cyan('Run `gulp enable analyze` to install dependencies.'));
    cb();
  }
  if (psi) {
    runSequence(
      'analyze:external:pagespeed:mobile',
      'analyze:external:pagespeed:desktop',
      cb
    );
  }
});
/**
 * Run page speed insights
 */
gulp.task('analyze:external:pagespeed:mobile', (cb) => {
  runPageSpeed('mobile', cb);
});

/**
 * Run page speed insights
 */
gulp.task('analyze:external:pagespeed:desktop', (cb) => {
  runPageSpeed('desktop', cb);
});

/**
 * Run page speed insights
 */
gulp.task('analyze:external:lighthouse', (cb) => {
  gutil.log(gutil.colors.yellow('Not yet implemented'));
  cb();
});

/**
 * Analyze app bundle's weight
 */
gulp.task('analyze:weight', (cb) => {
  try {
    wp = require('webpack'); // eslint-disable-line
  }
  catch (e) {
    gutil.log(gutil.colors.red('Web platform must be enabled for'
      + ' dependency weight visualization to be generated.'));
    gutil.log(gutil.colors.cyan('Run `gulp enable web` to install web platform.'));
    cb();
  }
  if (wp) {
    try {
      vs = require('webpack-visualizer-plugin'); // eslint-disable-line
    }
    catch (e) {
      gutil.log(gutil.colors.red('Visualize feature must be enabled for'
        + ' dependency weight visualization to be generated.'));
      gutil.log(gutil.colors.cyan('Run `gulp enable visualize` to install visualizer.'));
      cb();
    }
    if (vs) {
      // run visualization
      startServer('analyze:weight:open-report', cb);
    }
  }
});

/**
 * Open completed page weight report
 */
gulp.task('analyze:weight:open-report', (cb) => {
  try {
    open = require('open'); // eslint-disable-line
  }
  catch (e) {
    gutil.log(gutil.colors.cyan('Tip - install npm package "open" to auto-open analysis.'));
  }
  if (open) {
    open(path.join(process.cwd(), 'build', 'web', 'release', '__stats.html'));
  }
  cb();
});
