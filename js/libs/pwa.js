import runtime from 'offline-plugin/runtime';

if (
  process.env.NODE_ENV === 'production'
  && runtime
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
