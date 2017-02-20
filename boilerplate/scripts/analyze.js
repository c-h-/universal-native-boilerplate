const gulp = require('gulp');
const gutil = require('gulp-util');
const path = require('path');
const runSequence = require('run-sequence');
const shell = require('shelljs');

const openReport = require('./helpers/openReport');
const startServer = require('./helpers/startServer');
const storePageSpeedResults = require('./helpers/storePageSpeedResults');

// server port
const port = 3000;
const strategies = ['mobile', 'desktop'];

// optional requires
let lighthouse;
let ngrok;
let psi;
let vs;
let wp;

let url = '';

/**
 * Run each strategy then store results
 */
function analyzePageSpeed(cb) {
  Promise.all(strategies.map((strategy) => {
    return psi(url, {
      strategy,
      threshold: 1,
      nokey: 'true',
    });
  }))
    .then(storePageSpeedResults)
    .then(() => {
      return new Promise((resolve) => {
        runSequence('analyze:external:pagespeed:open-report', resolve);
      });
    })
    .then(cb);
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
    analyzePageSpeed(cb);
  }
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

gulp.task('analyze:external:pagespeed:open-report', (cb) => {
  openReport(path.join(process.cwd(), 'build', 'web', 'page_speed_report.html'), cb);
});
