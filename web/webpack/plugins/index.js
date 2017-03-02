const devPlugins = require('./dev');
const productionPlugins = require('./production');
const initPlugins = require('./init');
const recipePlugins = require('./recipes');

recipePlugins.forEach((pluginDef) => {
  let Plugin = null;
  try {
    Plugin = require(pluginDef.name); // eslint-disable-line
  }
  catch (e) {
    console.info(`Tip: Enable ${pluginDef.recipe} features`
      + ` with command 'gulp enable ${pluginDef.recipe}'`);
  }
  if (Plugin) {
    const list = pluginDef.prodOnly ? productionPlugins : initPlugins;
    list.push(new Plugin(pluginDef.options));
  }
});

module.exports = {
  init: initPlugins,
  production: productionPlugins,
  dev: devPlugins,
};
