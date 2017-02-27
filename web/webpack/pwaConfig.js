const path = require('path');
const config = require('./config');

const PUBLIC_PATH = config.PUBLIC_PATH;

module.exports = {
  // (see https://github.com/haydenbleasel/favicons#usage)
  appName: 'UniversalNativeBoilerplate', // Your application's name. `string`
  appDescription: null,           // Your application's description. `string`
  developerName: 'Charlie Hulcher', // Your (or your developer's) name. `string`
  developerURL: 'https://charlie.engineer', // Your (or your developer's) URL. `string`
  background: '#fff',             // Background colour for flattened icons. `string`
  theme_color: '#ccc',         // Theme color for browser chrome
  path: '/',                      // Path for overriding default icons path. `string`
  display: 'standalone',          // Android display: 'browser' or 'standalone'. `string`
  orientation: 'portrait',        // Android orientation: 'portrait' or 'landscape'. `string`
  start_url: `${PUBLIC_PATH}?homescreen=1`, // Android start application's URL. `string`
  logging: false,                 // Print logs to console? `boolean`
  online: false,                  // Use RealFaviconGenerator to create favicons? `boolean`
  preferOnline: false,            // Use offline generation, if online has failed. `boolean`

  // Your source logo
  logo: path.join(process.cwd(), 'web', 'src', 'img', 'icon.png'),
  // The prefix for all image files (might be a folder or a name)
  prefix: 'icons/',
  // Emit all stats of the generated icons
  emitStats: false,
  // The name of the json containing all favicon information
  statsFilename: 'iconstats-[hash].json',
  // Generate a cache file with control hashes and
  // don't rebuild the favicons until those hashes change
  persistentCache: false,
  // Inject the html into the html-webpack-plugin
  inject: true,

  // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    coast: false,
    favicons: true,
    firefox: true,
    opengraph: true,
    twitter: true,
    yandex: false,
    windows: true,
  },
};
