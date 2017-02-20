const gutil = require('gulp-util');
const path = require('path');
const nodemon = require('nodemon');
const rimraf = require('rimraf');
const webpack = require('webpack');

const serverWebpackConfig = require(path.join(process.cwd(), 'web', 'server', 'webpack.config.js'));

function buildServerPlatform(modeToRun, callback) {
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
        compiler[webpackMode](webpackDone);
        break;
    }
  });
};
module.exports = buildServerPlatform;
