const runSequence = require('run-sequence');
const shell = require('shelljs');

function runWebPlatform(callback) {
  function startServer() {
    shell.exec(global.settings.production
      ? 'npm run start:production:web'
      : 'npm run start:packager:web',
      {
        async: true, // async this so it doesn't block task completion
      }
    );
    callback();
  }
  if (global.settings.production) {
    runSequence('build', startServer);
  }
  else {
    startServer();
  }
}

module.exports = runWebPlatform;
