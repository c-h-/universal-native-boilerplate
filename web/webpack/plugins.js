const devPlugins = require('./devPlugins');
const productionPlugins = require('./productionPlugins');
const initPlugins = require('./initPlugins');
const optionalPlugins = require('./optionalPlugins');

optionalPlugins.forEach((pluginDef) => {
  let Plugin = null;
  try {
    Plugin = require(pluginDef.name); // eslint-disable-line
  }
  catch (e) {
    console.info(`Tip: Install ${pluginDef.name} with command 'gulp enable ${pluginDef.recipe}'`);
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
