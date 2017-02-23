/**
 * Transforms Web code using web .babelrc in test mode (CommonJS modules)
 */
const babelOptions = require('../web/.babelrc');
module.exports = require('babel-jest').createTransformer(babelOptions);
