const gulp = require('gulp');
const gutil = require('gulp-util');

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
  .command('enable <recipe>', 'Enable a platform or feature')
  .command('enable-all', 'Enable all platforms')
  .command('clean[:target]', 'Clean all caches (npm, yarn). Or, include a single target')
  .command('run <platform>', 'Runs the app on the supplied platform')
  .command('build <platform>', 'Builds the app for the supplied platform')
  .command('analyze <platform>', 'Analyze weight. For web, also speed and pwa scorecard')
  // .command('start <platform>', 'Start packager for the supplied platform')
  .alias('p', 'production')
  .describe('p', 'Build the release version. Defaults to debug version.')
  .help('h')
  .alias('h', 'help')
  .epilogue(`Available platforms: ${global.platforms.join(', ')}`)
  .demand(1)
  .argv;

// SETUP
function setSettings(args) {
  if (args._) {
    if (!global.settings) {
      global.settings = {
        recipe: args.recipe,
        platform: args.platform,
        production: args.production || args.p,
      };
    }
  }
  else {
    gutil.log(gutil.colors.red('Invalid CLI command. Run "gulp --help" for options.'));
    process.exit(1);
  }
}
setSettings(argv);

if (global.settings.production) {
  // in production mode, make sure environment is production
  process.env.NODE_ENV = 'production';
}

// Customize CLI behavior
// Make gulp think we have tasks so that it doesn't error
if (argv._) {
  if (argv._[0] && argv._[0].indexOf(':') > -1) {
    gutil.log(gutil.colors.red('Running subtasks is not allowed due to unknown behavior.'));
    process.exit();
  }
  const tasks = Object.keys(gulp.tasks);
  // fill in missing tasks
  const toFillIn = ['_', 'platform', 'recipe'];
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

require('./boilerplate/scripts/analyze.js');
require('./boilerplate/scripts/build.js');
require('./boilerplate/scripts/clean.js');
require('./boilerplate/scripts/enable.js');
require('./boilerplate/scripts/run.js');
require('./boilerplate/scripts/setup.js');
require('./boilerplate/scripts/switch.js');
