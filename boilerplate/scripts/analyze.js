const gulp = require('gulp');
const gutil = require('gulp-util');
const path = require('path');
const runSequence = require('run-sequence');
const shell = require('shelljs');

// server port
const port = 3000;

// optional requires
let lighthouse;
let ngrok;
let open;
let psi;
let vs;
let wp;

let url = '';
const queuedCallbacks = [];
let serverStarted = false;
let serverFinished = false;

function openReport(localPath, cb) {
  try {
    open = require('open'); // eslint-disable-line
  }
  catch (e) {
    gutil.log(gutil.colors.cyan('Tip - install npm package "open" to auto-open analysis.'));
  }
  if (open) {
    open(localPath);
  }
  cb();
}

/**
 * Runs page speed insights analysis
 */
function runPageSpeed(strategy, cb) {
  psi.output(url, {
    nokey: 'true',
    strategy,
    threshold: 1,
  }).then(cb, cb);
}

/**
 * Shared startServer function ensures the server starts if
 * any analyze action succeeds in passing verification.
 * Once finished starting it calls the callbacks passed in.
 */
function startServer(callback) {
  global.settings.platform = 'web'; // switch to web platform
  global.settings.release = true; // set to release mode
  queuedCallbacks.push(callback);
  if (serverFinished) {
    callback();
    return;
  }
  if (!serverStarted) {
    serverStarted = true;
    runSequence('run', () => { // build and run project
      // server is started
      // now we want to call all callbacks
      queuedCallbacks.forEach((cb) => {
        cb();
      });
      serverFinished = true;
    });
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
  runSequence(tasks, () => {
    cb();
    process.exit(0);
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
    startServer(() => {
      runSequence(
        'analyze:serve',
        [ // parallelize analysis
          'analyze:external:pagespeed',
          'analyze:external:lighthouse',
        ],
        cb
      );
    });
  }
});

/**
 * Tunnel locally hosted site
 */
gulp.task('analyze:serve', (cb) => {
  ngrok.connect(port, (err, publicUrl) => {
    url = publicUrl;
    cb();
  });
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
  try {
    lighthouse = require('lighthouse'); // eslint-disable-line
  }
  catch (e) {
    gutil.log(gutil.colors.red('Analyze feature must be enabled for'
      + ' pagespeed and lighthouse analysis to be generated.'));
    gutil.log(gutil.colors.cyan('Run `gulp enable analyze` to install dependencies.'));
  }
  if (lighthouse) {
    const suffix = process.platform === 'win32' ? '.cmd' : '';
    const cmd = path.join(process.cwd(), 'node_modules', '.bin', `lighthouse${suffix}`);
    shell.exec(
      `${cmd} ${url} --quiet --output html`
        + ' --output-path ./build/web/progressive_web_app_report.html',
      {
        async: true,
        cwd: process.cwd(),
      },
      () => {
        runSequence('analyze:external:lighthouse:open-report', cb);
      }
    );
  }
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
      startServer(() => {
        runSequence('analyze:weight:open-report', cb);
      });
    }
  }
});

/**
 * Open completed bundle weight report
 */
gulp.task('analyze:weight:open-report', (cb) => {
  openReport(path.join(process.cwd(), 'build', 'web', 'bundle_weight_report.html'), cb);
});

/**
 * Open completed pwa report
 */
gulp.task('analyze:external:lighthouse:open-report', (cb) => {
  openReport(path.join(process.cwd(), 'build', 'web', 'progressive_web_app_report.html'), cb);
});
