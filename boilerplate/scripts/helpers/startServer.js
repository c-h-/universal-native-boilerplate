const runSequence = require('run-sequence');

const queuedCallbacks = [];
let serverStarted = false;
let serverFinished = false;
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

module.exports = startServer;
