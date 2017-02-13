# Universal Native Boilerplate

Using this boilerplate it's easy to build an app that compiles natively for every major platform while sharing user interface and business logic. It's powered by React, React Native, and community extensions.

This boilerplate is meant to be an hassle-free project starting point. Since platforms and features are by default disabled, you get to be opinionated about which ones to enable.

Simply get the boilerplate and enable the platforms and features you need.

A command line interface is included with the boilerplate that should aid in development and maintenance for the life of your project. The CLI is easily extendable by adding Gulp tasks.

Familiarity with React and React Native is recommended before using this boilerplate.

`Node >= 6.8.0 recommended`

## Quick Start

### Installation
1. Download the boilerplate code:
```sh
git clone https://github.com/c-h-/universal-native-boilerplate.git my-app
cd my-app
```

2. `yarn install` OR `npm install`

3. `npm run setup` Eject from boilerplate repository

4. `npm init` Configure project package

5. `gulp enable android` enables Android. Add more platforms and features the same way.

### Enabling Platforms and Features

When every feature and platform is enabled yarn and npm move quite slowly. Therefore, all the source code required to run each platform and feature is included but the dependencies need to be enabled.

Run `gulp enable <recipe>` for each desired platform and feature.

It's recommended to choose platforms and features at the beginning. Adding them later can give unexpected results. Additionally, your app's code may need refactoring if you enable platforms later on.

Available platforms and features:

name | type | notes
--- | --- | ---
android | platform | standard [react native](https://github.com/facebook/react-native)
ios | platform | standard [react native](https://github.com/facebook/react-native)
macos | platform | [react-native-macos](https://github.com/ptmt/react-native-macos)
server | platform | server side rendering of web version. requires web platform.
web | platform | Offline-first Progressive Web App powered by [react-native-web](https://github.com/necolas/react-native-web)
windows | platform | [react-native-windows](https://github.com/ReactWindows/react-native-windows)
visualizer | feature | Works with web platform. Generates a nice graph of dependency weight so it's easy to see where bundle size is coming from. [webpack-visualizer](https://github.com/chrisbateman/webpack-visualizer)

### Run, Build, Release
#### Command Line
Nothing stops you from using the underlying commands to manage your project, however it can be a pain to remember how to do each operation. There's `react-native` commands, `react-native-macos` commands, package.json commands, and on and on.

This boilerplate comes with a customized Gulp CLI to ease configuration and day-to-day dev. Run `gulp --help` for up to date options. The point of this CLI is to make it unnecessary to remember every CLI command for each platform.

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
  -r, --release  Build a production, releaseable version. Defaults to debug version.
  -h, --help     Show help                                             [boolean]

Available platforms: android, ios, macos, server, web, windows
```

#### Automated Organization
If you use the Gulp CLI, compiled versions are organized by platform in the `/build` folder.

#### Publishing
Additional steps are required to publish your app for most platforms. More documentation soon.

### Configure

Native platforms need the appropriate tools (SDKs) set up in order to compile and run.

#### Android
This boilerplate takes care of everything project-related for the platform.
That means the only remaining task to get up and running is to configure the Android SDK.
Use the [official getting started guide](https://facebook.github.io/react-native/docs/getting-started.html) to set up the SDK.

#### iOS
This boilerplate takes care of everything project-related for the platform.
That means the only remaining task to get up and running is to configure XCode.
Use the [official getting started guide](https://facebook.github.io/react-native/docs/getting-started.html).

#### macOS
Follow iOS instructions.

#### Server
Nothing :P

#### Windows
This boilerplate takes care of everything project-related for the platform.
That means the only remaining task to get up and running is to configure the Windows SDK.
If it is not already set up, follow the official guide: [official getting started guide and requirements](https://github.com/ReactWindows/react-native-windows#getting-started).

#### Web
Nothing :P

### Baked-in Features
Some features come baked in. This includes:

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

### Web and Server Platform Notes

The web and server platform has been set up to make newly created projects great by default.
Here's a list of features and notes:

- Webpack 2 + Babel build script with Tree Shaking enabled.
- Hot Module Reloading (HMR) enabled.
- HappyPack parallelized webpack builds
  - See `happypack` branch. [Currently broken](https://github.com/amireh/happypack/issues/128).
- Redux pre-installed
  - [Web Worker hosted reducers](https://github.com/chikeichan/redux-worker) help unblock the main thread during expensive reducer computations. (Coming soon)
- [Progressive Web App](https://developers.google.com/web/progressive-web-apps/) (Coming soon)
  - Installable on mobile home screens
  - It's [offline-first](https://github.com/NekR/offline-plugin) using Service Workers to cache resources
  - It's easy to test how well it performs with automatic [lighthouse](https://github.com/GoogleChrome/lighthouse) testing
- Supports alternative React backends (Preact, Inferno, etc) (Coming soon)
- Advanced bundle optimizations such as:
  - [Optimize JS](https://github.com/nolanlawson/optimize-js) potentially speeds up web app start times. Definitely test to ensure it actually improves start times for your app. (Coming soon)
  - [Polyfill.io](https://polyfill.io/v2/docs/) use a lighter Babel transform preset for web code and instead include just the polyfills you need for your app, tailored to each browser. Reduces bundle sizes. (Coming soon)
  - [React element inlining](https://babeljs.io/docs/plugins/transform-react-inline-elements/) as described well [here](http://techblog.netflix.com/2017/01/crafting-high-performance-tv-user.html).

### Notes and Tips
#### Performance
Try to limit passing dynamic props and passing props between React components wherever possible. [Netflix has good insights](http://techblog.netflix.com/2017/01/crafting-high-performance-tv-user.html) into the lengths you can go to maximize performance.

#### File Organization
Any way of organizing the `/js` folder of source will work fine. The boilerplate is organized around app views (scenes or pages). This can help with code splitting to reduce web bundle sizes on initial load. It can also assist in keeping organized should the app grow to be a large codebase.

Styles, view sub-components, and redux action creators and reducers are all in a view's subfolder. Everything that's app-wide is exterior to the `/js/views` folder, including app-wide reducers. 

#### CSS
React Native supports a CSS-like API for styling components. No CSS capabilities have been added to the boilerplate because of this.
It is possible to use CSS with the web platform only, but it's not recommended due to organizational issues that would be inevitable.

#### Supported JS Features
See the [official docs](https://facebook.github.io/react-native/docs/javascript-environment.html) for details of which JS features are supported by default.
The web platform uses `/.babelrc.web` to enable the same features in a way that works for the browser.

#### Platform Specific Code
It's easy to add native functionality to a React Native and consume it from JS. See [official docs](https://facebook.github.io/react-native/docs/native-modules-ios.html) for details.

It's also easy to create JavaScript code that's platform-specific. Imagine you have a file `Button.js`. To add a version that only gets included on iOS, add a file named `Button.ios.js`. Now, when the file is `import`ed, the `Button.js` version will used on every platform except iOS. On iOS, the `Button.ios.js` bersion will be used. Other platform versions can be added using the following convention: `[filename].[platform].[extension]`.

#### Third-Party React Native Plugins
Not all React Native third party plugins work on every platform. An easy way to check compatibility is to see if the plugin requires native code. If it does, that means it won't work on any platform that there isn't native code written for. Some third-party plugins with native code break the web platform version. If this is the case, an easy solution is to only `import` the offending plugin in a platform-specific JS file.

#### Preventing Headaches and Refactors
To ensure your app works on every platform it's recommended to preview each enabled platform as you work, or at least preview each enabled platform often. This will help ensure that code written will work without hassle.

### Roadmap
The frontend world moves fast. As I have time I'll try to add more features and any new platforms released that are compatible with React Native and stable.

Something that will definitely be added if it's ever released for React (or an alternative React backend) is Ahead of Time compilation, a feature that only Angular 2 currently supports. There may be a path for React to use [EchoJS](https://github.com/toshok/echojs)