const assign = require('lodash.assign');
const fs = require('fs-extra');
const gulp = require('gulp');
const gutil = require('gulp-util');
const isEqual = require('lodash.isequal');
const path = require('path');
const shell = require('shelljs');

const platformPkgs = require('../platform_packages');

const pathToPkg = path.resolve(__dirname, '..', '..', 'package.json');

const haveYarn = shell.which('yarn');

function enablePlatform(platform) {
  return new Promise((resolve, reject) => {
    gutil.log(gutil.colors.green(`Enabling ${platform}...`));
    fs.readJSON(pathToPkg, (err, origPkg) => {
      const pkg = origPkg;
      let modified = false;
      const newDeps = assign({}, pkg.dependencies, platformPkgs[platform].dependencies);
      if (!isEqual(pkg.dependencies, newDeps)) {
        pkg.dependencies = newDeps;
        modified = true;
      }
      const newDevDeps = assign({}, pkg.devDependencies, platformPkgs[platform].devDependencies);
      if (!isEqual(pkg.devDependencies, newDevDeps)) {
        pkg.devDependencies = newDevDeps;
        modified = true;
      }
      if (modified) {
        gutil.log(gutil.colors.yellow('This can take awhile'));
        fs.writeJson(pathToPkg, pkg, { spaces: 2, }, (err2) => {
          if (err2) {
            reject(err2);
          }
          else {
            shell.exec(haveYarn ? 'yarn' : 'npm i');
            gutil.log(gutil.colors.green(`Platform ${platform} enabled.`));
          }
        });
      }
      else {
        resolve();
      }
    });
  });
}

/**
 * Enable platforms one by one
 */
gulp.task('enable', [
  'enable:android',
  'enable:ios',
  'enable:macos',
  'enable:windows',
  'enable:server',
  'enable:web',
]);

/**
 * Enable Android platform
 */
gulp.task('enable:android', () => enablePlatform('android'));

/**
 * Enable iOS platform
 */
gulp.task('enable:ios', () => enablePlatform('ios'));

/**
 * Enable macOS platform
 */
gulp.task('enable:macos', () => enablePlatform('macos'));

/**
 * Enable Server platform
 */
gulp.task('enable:server', () => enablePlatform('server'));

/**
 * Enable Windows platform
 */
gulp.task('enable:windows', () => enablePlatform('windows'));

/**
 * Enable Web platform
 */
gulp.task('enable:web', () => enablePlatform('web'));
