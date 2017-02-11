const gutil = require('gulp-util');

require('./boilerplate/scripts/clean.js');
require('./boilerplate/scripts/enable.js');
require('./boilerplate/scripts/setup.js');

global.platforms = [
  'android',
  'ios',
  'macos',
  'server',
  'web',
  'windows',
];

const argv = require('yargs')
  .usage('Usage: gulp <task> [options]')
  .command('setup', 'Eject from original repository after cloning')
  .command('enable <platform>', 'Enable a platform in the project')
  .command('enable-all', 'Enable all platforms in the project')
  .command('clean[:target]', 'Clean all caches (npm, yarn). Or, include a single target')
  .command('run <platform>', 'Runs the app on the supplied platform')
  .command('build <platform>', 'Builds the app for the supplied platform')
  .alias('r', 'release')
  .describe('r', 'Build the release version. Defaults to debug version.')
  .help('h')
  .alias('h', 'help')
  .epilogue(`Available platforms: ${global.platforms.join(', ')}`)
  .argv;

// SETUP
function setSettings(args) {
  if (args._) {
    switch (args._[0]) {
      case 'enable':
      case 'build':
      case 'run':
        if (args._.length !== 2) {
          gutil.log(gutil.colors.red('Invalid CLI command. Run "gulp --help" for options.'));
        }
        break;
      default:
        break;
    }
    if (!global.settings) {
      global.settings = {
        platform: args.platform,
      };
    }
  }
  else {
    gutil.log(gutil.colors.red('Invalid CLI command. Run "gulp --help" for options.'));
    process.exit(1);
  }
}
setSettings(argv);
