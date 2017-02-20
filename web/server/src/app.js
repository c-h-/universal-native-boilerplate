import Express from 'express';
import React from 'react';
import {
  renderToString,
} from 'react-dom/server';
import {
  Provider,
} from 'react-redux';
import fs from 'fs';
import {
  generateStore,
} from '../../../js/redux/store';
import App from '../../../js/components/App';

const app = Express();
const port = 3000;

// "cache" index.html as string
let indexHTML = '';

// insert our data into our cached html page
function renderFullPage(html, preloadedState) {
  // See http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
  return indexHTML.replace(
    '<div id="container"></div>',
    `<div id="container">${html}</div><script>`
    + `window.__PRELOADED_STATE__=${JSON.stringify(preloadedState)}</script>`
  );
}

function handleRender(req, res) {
  // Create a new Redux store instance
  const store = generateStore();

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Grab the initial state from our Redux store
  const preloadedState = store.getState();

  // Send the rendered page back to the client
  res.send(renderFullPage(html, preloadedState));
}

// This is fired every time the server side receives a request
fs.readFile('./build/web/production/index.html', (err, data) => {
  if (err) {
    throw err;
  }
  else {
    indexHTML = data.toString();
    app.use(handleRender);
    app.listen(port);
    console.log(`Listening on port ${port}`);
  }
});
