import Express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import {
  AppRegistry,
  View,
} from 'react-native';
import {
  renderToString,
} from 'react-dom/server';
import {
  Provider,
} from 'react-redux';

// get store from App
import {
  generateStore,
} from '../../js/redux/store';

// App un-wrapped by Redux provider
import App from '../../js/components/App';
import getAction from '../../js/components/getAction';

// Navigation components let us process the requested route and render it
import AppNavigator from '../../js/components/AppNavigator';

const app = Express();
const port = 3000;

let mode = 'production';
if (process.env.NODE_ENV !== 'production') {
  mode = 'debug';
}

const matchClientStyles = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

// "cache" index.html as string
let indexHTML = '';

// insert our data into our cached html page
function renderFullPage(html, preloadedState, stylesheet) {
  // See http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
  return indexHTML.replace(
    '<div id="container"></div>',
    `<div id="container">${html}</div><script>`
    + `window.__PRELOADED_STATE__=${JSON.stringify(preloadedState)}</script>`
  ).replace('</head>', `${stylesheet}</head>`);
}

function handleRender(req, res) {
  // only answer requests without an extension with the pre-rendered app
  if (req.originalUrl.indexOf('.') === -1) {
    // pre-populate state here
    const initialState = {
      transient: {
        appReady: true, // state is populated so set that the app is ready
      },
      nav: AppNavigator.router.getStateForAction(
        getAction(AppNavigator.router, req.originalUrl.slice(1))
      ) || {},
    };

    // Create a new Redux store instance
    const store = generateStore(initialState);

    AppRegistry.registerComponent('UniversalNativeBoilerplate', () => {
      return (
        <Provider store={store}>
          <App />
        </Provider>
      );
    });

    const {
      // element,
      stylesheet,
    } = AppRegistry.getApplication('UniversalNativeBoilerplate', {});

    // BROKEN Render the component to a string
    // const html = renderToString(element);

    // HOTFIX Render the component to a string
    // NOTE: For server side rendering to work properly the generated HTML
    // has to match what the client would render. The View and its style
    // attribute here make that happen
    const html = renderToString(
      <View
        style={matchClientStyles}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </View>
    );

    // Grab the initial state from our Redux store
    const preloadedState = store.getState();

    // Send the rendered page back to the client
    res.send(renderFullPage(html, preloadedState, stylesheet));
  }
  else {
    res.sendFile(path.join(process.cwd(), `build/web/${mode}/${req.originalUrl.slice(1)}`));
  }
}

// This is fired every time the server side receives a request
fs.readFile(`./build/web/${mode}/index.html`, (err, data) => {
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
