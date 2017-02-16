# Universal Native Boilerplate

## Introduction
The holy grail of front-end development is writing code once from which great apps are compiled for every platform without compromise. React Native's philosophy is "learn once, write everywhere". Today that goal is closer than ever.

This starter project is a boilerplate: a project pre-configured so that you can start building.

With this boilerplate it should be straightforward to create an app that works well on every platform - Android, iOS, macOS, server-side rendering, web, and Windows. When you first start a project you pick the platforms and features you want. As you build, the tools grow with you. It comes with built-in tools for analysis, code quality, and testing. It's organized in a way that will help prevent headaches as the app's codebase matures and expands. And when you're ready to build a production version, many optimizations are built-in to help get you to production faster.

Familiarity with React and React Native is recommended. Explore the codebase to see how easy it is to make 99% of code written cross-platform.

`Node >= 6.8.0 recommended`

## Quick Start

### Installation
```sh
git clone https://github.com/c-h-/universal-native-boilerplate.git myApp
cd myApp
yarn install # OR npm install
npm run setup # initialize a new git repository
```

### Enable Platforms and Features

This boilerplate comes with a simple command-line interface to make it painless to manage your project. Run `gulp` if you ever forget the commands. _*Note: the CLI is a simple wrapper around the normal commands. If you feel comfortable with those, go ahead and use them!_

To reduce headaches, pick platforms and features when you first begin.

Some commands:
```sh
# Enable a platform or feature
gulp enable android

# Build a platform
gulp build ios
gulp build ios --production # Build a production version

# Run a platform
gulp run windows

# Analyse bundle contents, load speed, and usability
gulp analyze web
``` 

## Reference
### Enabling Platforms and Features

When every feature and platform is enabled yarn and npm move quite slowly. Therefore, all the source code required to run each platform and feature is included but the dependencies need to be enabled.

Run `gulp enable <recipe>` for each desired platform and feature.

Adding platforms and features after you write your app can give unexpected results. Additionally, your app's code may need refactoring if you enable platforms later on.

Available platforms and features:

name | type | notes
--- | --- | ---
android | platform | standard [react native](https://github.com/facebook/react-native)
ios | platform | standard [react native](https://github.com/facebook/react-native)
macos | platform | [react-native-macos](https://github.com/ptmt/react-native-macos)
server | platform | server side rendering of web version. requires web platform.
web | platform | Offline-first Progressive Web App powered by [react-native-web](https://github.com/necolas/react-native-web)
windows | platform | [react-native-windows](https://github.com/ReactWindows/react-native-windows)
 | |  
hints | feature | Add [resource hints](https://www.w3.org/TR/resource-hints/) to web `index.html` to speed page load time
insights | feature | Enable automated [Page Speed Insights](https://www.npmjs.com/package/psi) and [Lighthouse](https://github.com/GoogleChrome/lighthouse) reports. Saves reports as HTML for review. See also visualizer feature. Note: both of these reports use `ngrok` to publicly host the project. Once analysis is complete the project is taken down. Run with `gulp analyze web`.
offline | feature | Generate a [Service Worker](https://github.com/NekR/offline-plugin) automatically for web. Enables offline use of the app and required to be a Progressive Web App.
optimize | feature | Attempt to get faster startup times at the expense of a few bytes. [optimize-js](https://github.com/vigneshshanmugam/optimize-js-plugin)
pwa | feature | Make web app a progressive web app. Generates [icons](https://github.com/haydenbleasel/favicons#usage) and [manifest](https://w3c.github.io/manifest/) for web.
visualizer | feature | Useful for all platforms but requires web platform to be enabled. Generates a nice graph of dependency weights. Saves as html report. Run with `gulp analyze <platform>`. [webpack-visualizer](https://github.com/chrisbateman/webpack-visualizer)

### Command Line
Nothing stops you from using the underlying commands to manage your project, however it can be a pain to remember how to do each operation. There's `react-native` commands, `react-native-macos` commands, package.json commands, and on and on.

This boilerplate comes with a customized Gulp CLI to ease configuration and day-to-day dev. Run `gulp --help` for up to date options.

```
Usage: gulp <task> [options]

Commands:
  setup             Eject from original repository after cloning
  enable <recipe>   Enable a platform or feature
  enable-all        Enable all platforms
  build <platform>  Builds the app for the supplied platform
  run <platform>    Builds and runs the app on the supplied platform
  clean[:target]    Clean all caches (npm, yarn). Or, include a single target.

Options:
  -p, --production  Build a production, releaseable version. Defaults to debug version.
  -h, --help        Show help                                             [boolean]

Available platforms: android, ios, macos, server, web, windows
```

#### Automated Organization
If you use the command line, compiled versions are organized by platform in the `/build` folder. Analysis reports are saved to `/build/web`.

### Baked-in Features
Some features come pre-installed. This includes:

- [React Navigation](https://reactnavigation.org/)
  - Great library shares navigation across every platform. This boilerplate implements a custom navigator to cover web, server, Windows, and macOS.
  - This boilerplate is set up to use the native TabNavigators for iOS and Android in order to get smooth native behavior. Delete `/js/components/AppNavigator.android.js` and `/js/components/AppNavigator.ios.js` to use the same navigator on every platform.
  - Also configured into this boilerplate:
    - Deep linking support (coming soon)
    - URL support (coming soon)
    - Redux integrated
- Redux
  - State management and logic organization
- Redux Persist
  - Persist state across sessions
  - See [Redux Persist](https://github.com/rt2zz/redux-persist#transforms) for great transforms like compression and encryption

## Platforms
### Android
#### SDK Setup
This boilerplate takes care of everything project-related for the platform.
That means the only remaining task to get up and running is to configure the Android SDK.
Use the [official getting started guide](https://facebook.github.io/react-native/docs/getting-started.html) to set up the SDK.

#### Publishing
Once you build your app with `gulp build android -p` to get a production version you'll need to sign the app with your key and zipalign it before it can be uploaded to the Google Play Store for distribution.

Pro Tip: Use [Redex](http://fbredex.com/) to optimize your app before publishing.

### iOS and macOS
#### SDK Setup
This boilerplate takes care of everything project-related for the platform.
That means the only remaining task to get up and running is to configure XCode.
Use the [official getting started guide](https://facebook.github.io/react-native/docs/getting-started.html).

#### Publishing
Use XCode to sign and publish your app.

### Server and Web
#### SDK Setup
None.

#### Publishing

Publishing for the web is the simplest. Grab the files from `/build/web/release` and host them somewhere. GitHub Pages is good for static site hosting. Netlify is good too; it supports HTTPS via Let's Encrypt which is nice. If you want server-side rendering, you'll want to run the included server (or your own) in any Node instance.

Advanced Pro Tip: Use [Polyfill.io](https://polyfill.io/v2/docs/) and a lighter Babel transform preset for web code. This would mean a smaller app bundle size, with only the necessary code polyfilled for each browser. Since service workers don't support third-party origins right now, it breaks offline support to use polyfill.io. You can host your own polyfill service on a first-party server in order to enable offline support with this approach.

### Windows
#### SDK Setup
This boilerplate takes care of everything project-related for the platform.
That means the only remaining task to get up and running is to configure the Windows SDK.
If it is not already set up, follow the official guide: [official getting started guide and requirements](https://github.com/ReactWindows/react-native-windows#getting-started).

#### Publishing
¯\\_(ツ)_/¯

## Web and Server Platform Notes

The web and server platform has been set up to make newly created projects great by default.
Here's a list of features and notes:

- Webpack 2 + Babel build script with Tree Shaking enabled.
- Hot Module Reloading (HMR) enabled.
- Redux pre-installed
  - [Web Worker Middleware](https://github.com/chikeichan/redux-worker) help unblock the main thread during expensive computations. Pro Tip: doing network calls in workers doesn't really change performance; however doing heavy data processing in a worker will help performance.
- [Progressive Web App](https://developers.google.com/web/progressive-web-apps/)
  - Installable on mobile home screens
  - [Favicons](https://github.com/haydenbleasel/favicons) for every browser
  - [Offline-first](https://github.com/NekR/offline-plugin) using a Service Worker to cache resources
  - It's easy to test how well it performs with automatic [lighthouse](https://github.com/GoogleChrome/lighthouse) testing
- Advanced bundle optimizations such as:
  - [Resource Hints](https://www.w3.org/TR/resource-hints/) for faster page load times
  - [Optimize JS](https://github.com/nolanlawson/optimize-js) potentially speeds up web app start times. Definitely test to ensure it actually improves start times for your app. (Coming soon)
  - [React element inlining](https://babeljs.io/docs/plugins/transform-react-inline-elements/) as described well [here](http://techblog.netflix.com/2017/01/crafting-high-performance-tv-user.html).
- BROKEN: Supports alternative React backends (Preact, Inferno, etc). [Currently broken](https://github.com/necolas/react-native-web/issues/330).
- BROKEN: HappyPack parallelized webpack builds (multi-core JS transpilation)
  - See `happypack` branch. [Currently broken](https://github.com/amireh/happypack/issues/128).

### Notes and Tips
#### React Performance
Try to limit passing dynamic props and passing props between React components wherever possible. [Netflix has good insights](http://techblog.netflix.com/2017/01/crafting-high-performance-tv-user.html) into the lengths you can go to maximize performance.

#### File Organization
The boilerplate is organized around app views (view=scene or page). This can help with code splitting to reduce web bundle sizes on initial load. It can also assist in keeping organized should the app grow to be a large codebase. Styles, view sub-components, redux action creators, and redux reducers are mostly in each view's subfolder. Everything that's app-wide is exterior to the `/js/views` folder, including app-wide reducers.

#### CSS
React Native supports a CSS-like API in JS for styling components, therefore No CSS has been added to the boilerplate (except for an icons on web).
It is possible to use CSS with the web platform only, but it's not recommended due to organizational issues that would be inevitable.

#### Supported JS Features
See the [official docs](https://facebook.github.io/react-native/docs/javascript-environment.html) for details of which JS features are supported by default.
The web platform DOES NOT use `.babelrc`, it instead uses a babel configuration within `/web/webpack.config.js` to enable the same features in a way that works with other plugins.

#### Platform Specific Code
It's easy to add native functionality to a React Native app and consume it from JS. See [official docs](https://facebook.github.io/react-native/docs/native-modules-ios.html) for details.

It's also easy to create JavaScript code that's platform-specific. Imagine you have a file `Button.js`. To add a version that only gets included on iOS, add a file named `Button.ios.js`. Now, when the file is `import`ed, the `Button.js` version will used on every platform except iOS. On iOS, the `Button.ios.js` version will be used. Other platform versions can be added using the following convention: `[filename].[platform].[extension]`.

#### Third-Party React Native Plugins
Not all React Native third party plugins work on every platform. An easy way to check compatibility is to see if the plugin requires native code. If it does, that means it won't work on any platform that there isn't native code written for. Some third-party plugins with native code break the web platform version. If this is the case, an easy solution is to only `import` the offending plugin in a platform-specific JS file. As of this writing it is difficult to add native modules to macOS.

#### Preventing Headaches and Refactors
To ensure your app works on every platform it's recommended to preview each enabled platform as you work, or at least preview each enabled platform often. This will help ensure that code written will work without hassle.

### Roadmap
The frontend world moves fast. As I have time I'll try to add more dev features and any new platforms released that are compatible with React Native and stable.

Something that will definitely be added if it's ever released for React (or an alternative React backend) is Ahead of Time compilation, a feature that only Angular 2 currently supports. There may be a path for React to use [EchoJS](https://github.com/toshok/echojs).