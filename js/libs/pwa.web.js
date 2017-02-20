if (
  process.env.NODE_ENV === 'production'
  && typeof window !== 'undefined' // don't include on server
) {
  const runtime = require('offline-plugin/runtime');
  if (
    runtime
    && typeof runtime.install === 'function'
  ) {
    runtime.install({
      // When an update is ready, tell ServiceWorker to take control immediately:
      onUpdateReady() {
        runtime.applyUpdate();
      },

      // Reload to get the new version:
      onUpdated() {
        location.reload();
      },
    });
  }
}
