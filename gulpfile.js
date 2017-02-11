const gulp = require('gulp');
const gutil = require('gulp-util');

require('./boilerplate/scripts/build.js');
require('./boilerplate/scripts/clean.js');
require('./boilerplate/scripts/enable.js');
require('./boilerplate/scripts/run.js');
require('./boilerplate/scripts/setup.js');
require('./boilerplate/scripts/switch.js');

global.platforms = [
  'android',
  'ios',
  'macos',
  'server',
  'web',
  'windows',
];

// CLI options
const argv = require('yargs')
  .usage('Usage: gulp <task> [options]')
  .command('setup', 'Eject from original repository after cloning')
  .command('enable <platform>', 'Enable a platform in the project')
  .command('enable-all', 'Enable all platforms in the project')
  .command('clean[:target]', 'Clean all caches (npm, yarn). Or, include a single target')
  .command('run <platform>', 'Runs the app on the supplied platform')
  .command('build <platform>', 'Builds the app for the supplied platform')
  // .command('start <platform>', 'Start packager for the supplied platform')
  .alias('r', 'release')
  .describe('r', 'Build the release version. Defaults to debug version.')
  .help('h')
  .alias('h', 'help')
  .epilogue(`Available platforms: ${global.platforms.join(', ')}`)
  .argv;

// SETUP
function setSettings(args) {
  if (args._) {
    if (!global.settings) {
      global.settings = {
        platform: args.platform,
        release: args.r,
      };
    }
  }
  else {
    gutil.log(gutil.colors.red('Invalid CLI command. Run "gulp --help" for options.'));
    process.exit(1);
  }
}
setSettings(argv);

// Customize CLI behavior
// Make gulp think we have tasks so that it doesn't error
if (argv._) {
  const tasks = Object.keys(gulp.tasks);
  // fill in missing tasks
  const toFillIn = ['_', 'platform'];
  toFillIn.forEach((key) => {
    if (argv[key]) {
      const vals = Array.isArray(argv[key]) ? argv[key] : [argv[key]];
      vals.forEach((taskName) => {
        if (tasks.indexOf(taskName) === -1) {
          gulp.task(taskName, () => {});
        }
      });
    }
  });
}
