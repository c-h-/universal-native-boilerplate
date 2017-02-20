const gutil = require('gulp-util');

let open;

function openReport(localPath, cb) {
  try {
    open = require('open'); // eslint-disable-line
  }
  catch (e) {
    gutil.log(gutil.colors.cyan('Tip - install npm package "open" to auto-open analysis.'));
  }
  if (open) {
    open(localPath);
  }
  cb();
}

module.exports = openReport;
