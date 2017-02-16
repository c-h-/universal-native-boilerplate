const fs = require('fs-extra');
const gulp = require('gulp');
const gutil = require('gulp-util');
const path = require('path');
const runSequence = require('run-sequence');
const shell = require('shelljs');

// server port
const port = 3000;
const strategies = ['mobile', 'desktop'];

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
 * Format JSON as HTML tables and save
 */
function storePageSpeedResults(results) {
  return new Promise((resolve, reject) => {
    const json = {
      results,
    };
    const basePath = path.join(process.cwd(), 'build', 'web');
    fs.writeJSON(
      path.join(basePath, 'page_speed_report.json'),
      json,
      {
        spaces: 2,
      },
      (err) => {
        if (err) {
          reject(err);
        }
      }
    );
    // builds a gross table
    // function buildTable(obj, prefix = '') {
    //   let head = '';
    //   let body = '';
    //   if (obj && typeof obj === 'object') {
    //     if (Array.isArray(obj)) {
    //       obj.forEach(item => (body += buildTable(item, `  ${prefix}`)));
    //     }
    //     else {
    //       head += `${prefix}<table>\n`;
    //       head += `${prefix}  <thead>\n${prefix}    <tr>\n`;
    //       body += `${prefix}  <tbody>\n${prefix}    <tr>\n`;
    //       for (const key in obj) {
    //         const val = obj[key];
    //         head += `${prefix}      <th>${key}</th>\n`;
    //         body += `${prefix}      <td>\n${buildTable(val, `      ${prefix}`)}${prefix}      </td>\n`;
    //       }
    //       head += `${prefix}    </tr>\n${prefix}  </thead>\n`;
    //       body += `${prefix}    </tr>\n${prefix}  </tbody>\n`;
    //       body += `${prefix}</table>\n`;
    //     }
    //     return `${head}\n${body}`;
    //   }
    //   else if (
    //     typeof obj === 'string'
    //     || typeof obj === 'number'
    //     || typeof obj === 'boolean'
    //   ) {
    //     // return simple types
    //     body += `${prefix}  ${obj}\n`;
    //     return body;
    //   }
    //   else {
    //     return body;
    //   }
    // }
    // step through manually
    let html = '<!doctype html><html><head><meta charset="UTF-8"><title>PageSpeed Insights Results</title></head><body>';
    json.results.forEach((result, j) => {
      html += `<h1>${strategies[j]} ${result.title}</h1>`;
      for (const i in result.ruleGroups) {
        html += `<h2>${i}: ${result.ruleGroups[i].score}</h2>`;
      }
      for (const i in result.pageStats) {
        html += `<h3>${i}: ${result.pageStats[i]}</h3>`;
      }
      const rules = [];
      for (const i in result.formattedResults.ruleResults) {
        rules.push(result.formattedResults.ruleResults[i]);
      }
      rules.sort((a, b) => b.ruleImpact - a.ruleImpact)
        .forEach((val) => {
          html += `<h5>${val.localizedRuleName}</h5>`;
          html += `<p>Rule impact: ${val.ruleImpact} | Rule Category: ${val.groups.join(', ')}</p>`;
          if (val.summary) {
            const i = val.summary.format.indexOf('Learn more at');
            const sum = i > -1
              ? val.summary.format.slice(0, i)
              : val.summary.format;
            html += `<p>${sum}</p>`;
          }
        });
    });
    html += '</body></html>';
    // const parsedTables = buildTable(results);
    fs.outputFile(
      path.join(basePath, 'page_speed_report.html'),
      html,
      (err) => {
        if (err) {
          reject(err);
        }
        else {
          resolve();
        }
      }
    );
  });
}

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
 * Shared startServer function ensures the server starts if
 * any analyze action succeeds in passing verification.
 * Once finished starting it calls the callbacks passed in.
 */
function startServer(callback) {
  global.settings.platform = 'web'; // switch to web platform
  global.settings.production = true; // set to production mode
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
