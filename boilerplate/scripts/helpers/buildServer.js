const gutil = require('gulp-util');
const path = require('path');
const rimraf = require('rimraf');

let nodemon;
let webpack;

function buildServerPlatform(modeToRun, callback) {
  try {
    nodemon = require('nodemon'); // eslint-disable-line
  }
  catch (e) {
    gutil.log(gutil.colors.red('Need server platform. Run `gulp enable server`.'));
    callback();
  }
  try {
    webpack = require('webpack'); // eslint-disable-line
  }
  catch (e) {
    gutil.log(gutil.colors.red('Need server platform. Run `gulp enable server`.'));
    callback();
  }
  const serverWebpackConfig = require(path.join(process.cwd(), 'server', 'webpack.config.js'));
  if (nodemon && webpack) {
    const webpackMode = modeToRun === 'run' ? 'watch' : 'run';

    const mode = global.settings.production ? 'production' : 'debug';
    // clean build server
    rimraf(path.join(
      process.cwd(),
      'build',
      'server',
      mode
    ), () => {
      // bundle server
      const compiler = webpack(serverWebpackConfig);
      let builtOnce = false;
      const webpackDone = (err) => {
        if (!err) {
          gutil.log(gutil.colors.cyan('[webpack] Built server'));
        }
        else {
          gutil.log(gutil.colors.red(err));
        }
        if (!builtOnce) {
          // once server finishes bundling first time, notify gulp we're done here
          callback();

          if (webpackMode === 'watch') {
            // start server with nodemon. It'll restart when webpack re-bundles it.
            nodemon({
              script: path.join(process.cwd(), 'build', 'server', mode, 'main.js'),
              watch: path.join(process.cwd(), 'build', 'server', mode),
              ignore: [
                'js/*',
                'web/*',
                'index.web.js',
              ],
            });
            nodemon.on('restart', () => {
              gutil.log(gutil.colors.cyan('[nodemon] Server restarted'));
            });
          }
        }
        builtOnce = true;
      };
      switch (webpackMode) {
        case 'watch':
          compiler[webpackMode]({}, webpackDone);
          break;
        case 'run':
        default:
          compiler[webpackMode](webpackDone);
          break;
      }
    });
  }
  else {
    callback();
  }
}

module.exports = buildServerPlatform;
