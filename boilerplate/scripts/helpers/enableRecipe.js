const assign = require('lodash.assign');
const fs = require('fs-extra');
const gutil = require('gulp-util');
const isEqual = require('lodash.isequal');
const path = require('path');
const shell = require('shelljs');

const recipePkgs = require('../../recipes');

const pathToPkg = path.join(process.cwd(), 'package.json');

const haveYarn = false; // Yarn doesn't work! shell.which('yarn');

function enableRecipe(recipe) {
  return new Promise((resolve, reject) => {
    const recipes = Array.isArray(recipe)
      ? recipe
      : [
        recipe,
      ];
    let moveOn = true;
    recipes.forEach((plat) => {
      if (!recipePkgs[plat]) {
        gutil.log(gutil.colors.red(`No recipe found for ${plat}`));
        moveOn = false;
        reject();
      }
    });
    if (moveOn) {
      gutil.log(gutil.colors.green(`Enabling ${recipe}...`));
      fs.readJSON(pathToPkg, (err, origPkg) => {
        const pkg = origPkg;
        let modified = false;
        const newDeps = assign({}, pkg.dependencies);
        recipes.forEach((plat) => {
          assign(newDeps, recipePkgs[plat].dependencies);
        });
        if (!isEqual(pkg.dependencies, newDeps)) {
          pkg.dependencies = newDeps;
          modified = true;
        }
        const newDevDeps = assign({}, pkg.devDependencies);
        recipes.forEach((plat) => {
          assign(newDevDeps, recipePkgs[plat].devDependencies);
        });
        if (!isEqual(pkg.devDependencies, newDevDeps)) {
          pkg.devDependencies = newDevDeps;
          modified = true;
        }
        if (modified) {
          gutil.log(gutil.colors.yellow('This can take awhile'));
          fs.writeJson(pathToPkg, pkg, { spaces: 2 }, (err2) => {
            if (err2) {
              reject(err2);
            }
            else {
              shell.exec(haveYarn ? 'yarn' : 'npm i');
              gutil.log(gutil.colors.green(`Recipe ${recipe} enabled.`));
              resolve();
            }
          });
        }
        else {
          gutil.log(gutil.colors.cyan('Nothing to do'));
          resolve();
        }
      });
    }
  });
}
module.exports = enableRecipe;
