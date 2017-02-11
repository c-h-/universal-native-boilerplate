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
    const platforms = Array.isArray(platform)
      ? [
        platform,
      ]
      : platform;
    fs.readJSON(pathToPkg, (err, origPkg) => {
      const pkg = origPkg;
      let modified = false;
      const newDeps = assign({}, pkg.dependencies);
      platforms.forEach((plat) => {
        assign(newDeps, platformPkgs[plat].dependencies);
      });
      if (!isEqual(pkg.dependencies, newDeps)) {
        pkg.dependencies = newDeps;
        modified = true;
      }
      const newDevDeps = assign({}, pkg.devDependencies);
      platforms.forEach((plat) => {
        assign(newDevDeps, platformPkgs[plat].devDependencies);
      });
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

function enableAllPlatforms() {

}

/**
 * Enable a platform
 */
gulp.task('enable', () => enablePlatform(global.settings.platform));

/**
 * Enable all platforms
 */
gulp.task('enable-all', () => enableAllPlatforms(global.platforms));

