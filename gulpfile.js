require('./boilerplate/scripts/setup.js');

const argv = require('yargs')
  .usage('Usage: gulp <task> [options]')
  .command('setup', 'Eject from original repository after cloning')
  .help('h')
  .alias('h', 'help')
  .argv;
