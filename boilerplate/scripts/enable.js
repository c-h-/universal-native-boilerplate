const gulp = require('gulp');

const enableRecipe = require('./helpers/enableRecipe');

/**
 * Enable a recipe
 */
gulp.task('enable', () => enableRecipe(global.settings.recipe));

/**
 * Enable all recipes
 */
gulp.task('enable-all', () => enableRecipe(global.platforms));

