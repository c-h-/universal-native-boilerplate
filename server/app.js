const express = require('express');
const ReactDOMServer = require('react-dom/server');
const AppRegistry = require('react-native').AppRegistry;

const Wrapper = require('../js/components/ReduxWrapper');

AppRegistry.registerComponent('App', Wrapper);

const app = express();

app.get('/*', (req, res) => {
  const rendered = AppRegistry.getApplication('App');
  res.send(ReactDOMServer.renderToString(rendered.element));
});

app.listen(3002, () => {
  console.log('UniversalNativeBoilerplate server listening on port 3002!');
});
