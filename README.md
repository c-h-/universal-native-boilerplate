# Universal Native Boilerplate
![Platforms](/boilerplate/docs/images/platforms_inv.png?raw=true)

[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/c-h-/universal-native-boilerplate)
[![Build Status](https://travis-ci.org/c-h-/universal-native-boilerplate.svg?branch=master)](https://travis-ci.org/c-h-/universal-native-boilerplate)
[![bitHound Overall Score](https://www.bithound.io/github/c-h-/universal-native-boilerplate/badges/score.svg)](https://www.bithound.io/github/c-h-/universal-native-boilerplate)
## Introduction
Use this starter project to create an app that works well on every platform - Android, iOS, macOS, server-side rendering, web, and Windows. Pick only the platforms and features you want.

As you create, the built-in tools grow with you. The project is organized to prevent headaches and refactors. When you're ready for production, pain-free web and server optimizations are built-in.

The web platform build is very capable with easy progressive web app support, webpack 2 with tree shaking, URL support, state persistence, and more. Get reports on page speed, bundle size, and progressive web app stats with `gulp analyze web`.

Familiarity with React and React Native is recommended. Explore the codebase in `/js` to see how easy it is to make 99% of code written cross-platform.

**[Read about the motivations for this project](https://medium.com/@chulcher/better-apps-by-default-f5a77ca4b9fb)**

`Node >= 6.8.0 recommended`

## Quick Start

### Installation
```sh
git clone https://github.com/c-h-/universal-native-boilerplate.git myApp
cd myApp
npm install
npm run setup # initializes a new git repository
```

### Enable Platforms and Features

This boilerplate comes with a simple command-line interface to make it painless to manage your project. Run `gulp` if you ever forget the commands. _*Note: the CLI is a simple wrapper around the normal commands. If you feel comfortable with those, go ahead and use them!_

To reduce headaches, pick platforms and features when you first begin.

Some commands:
```sh
# Enable a platform or feature
gulp enable windows

# Build a platform
gulp build android # Build debug
gulp build android --production # Build a production version

# Run a platform
gulp run ios # Run debug
gulp run android -p # Run production

# Analyse bundle contents, load speed, and usability
gulp analyze web
``` 

## Reference
### Baked-in Features
Some features come pre-installed. This includes:

- Platform specific features for web/server (See Web and Server Platform Notes)
- [React Navigation](https://reactnavigation.org/)
  - Great library shares navigation across every platform.
  - A custom TabNavigator is built into this boilerplate in order to have a working, consistent experience across platforms. This is used by default and does not use native modules.
  - Native TabNavigators are used on iOS and Android in order to get smooth native behavior. Delete `/js/components/AppNavigator.android.js` and `/js/components/AppNavigator.ios.js` to use the same navigator on every platform.
  - Also configured into this boilerplate:
    - Deep linking support (Android/iOS; easy to add others) _Note: Make sure to [configure the proper scheme and hostname](https://reactnavigation.org/docs/guides/linking) for your app_
    - URL support (web/server)
    - Redux integrated
- [Internationalization](https://github.com/AlexanderZaytsev/react-native-i18n) - translate your app into other languages easily
  - See react-native-i18n home page for usage. Allows for multiple languages with template variables.
- Redux
  - State management and logic organization
- Redux Persist
  - Persist state across sessions
  - See [Redux Persist](https://github.com/rt2zz/redux-persist#transforms) for great transforms like compression and encryption

### Enabling Platforms and Features

When every feature and platform is enabled npm moves quite slowly. Therefore, all the source code required to run each platform and feature is included but the dependencies need to be enabled.

Run `gulp enable <recipe>` for each desired platform and feature.

Adding platforms and features after you write your app can give unexpected results. Additionally, your app's code may need refactoring if you enable platforms later on.

Available to enable platforms and features (disabled by default):

Name | Type | Notes
--- | --- | ---
android | platform | Standard [react native](https://github.com/facebook/react-native)
ios | platform | Standard [react native](https://github.com/facebook/react-native)
macos | platform | [react-native-macos](https://github.com/ptmt/react-native-macos)
server | platform | Server side rendering of web version. Requires web platform.
web | platform | Offline-first Progressive Web App powered by [react-native-web](https://github.com/necolas/react-native-web)
windows | platform | [react-native-windows](https://github.com/ReactWindows/react-native-windows)
 | |  
hints | feature | Add [resource hints](https://www.w3.org/TR/resource-hints/) to web `index.html` to speed page load time
insights | feature | Enable automated [Page Speed Insights](https://www.npmjs.com/package/psi) and [Lighthouse](https://github.com/GoogleChrome/lighthouse) reports. Saves reports as HTML for review. See also visualizer feature. Note: both of these reports use `ngrok` to publicly host the project. Once analysis is complete the project is taken down. Run with `gulp analyze web`.
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
  clean[:target]    Clean all caches. Or, include a single target.

Options:
  -p, --production  Build a production, releaseable version. Defaults to debug version.
  -h, --help        Show help                                             [boolean]

Available platforms: android, ios, macos, server, web, windows
```

#### File Organization
If you use the command line, compiled versions are organized by platform in the `/build` folder. Analysis reports are saved to `/build/web`.

## Platforms
### Android
![Android Screenshot](/boilerplate/docs/images/android.png?raw=true)
#### SDK Setup
This boilerplate takes care of everything project-related for the platform.
That means the only remaining task to get up and running is to configure the Android SDK.
Use the [official getting started guide](https://facebook.github.io/react-native/docs/getting-started.html) to set up the SDK.

#### Publishing
Once you build your app with `gulp build android -p` to get a production version you'll need to sign the app with your key and zipalign it before it can be uploaded to the Google Play Store for distribution.

Pro Tip: Use [Redex](http://fbredex.com/) to optimize your app before publishing.

### iOS and macOS
_Note: The React Native macOS platform is not considered production-ready. Evaluate for yourself if the platform is ready for your app's needs._

![macOS Screenshot](/boilerplate/docs/images/macos.png?raw=true)
![iOS Screenshot](/boilerplate/docs/images/ios.png?raw=true)
#### SDK Setup
This boilerplate takes care of everything project-related for the platform.
That means the only remaining task to get up and running is to configure XCode.
Use the [official getting started guide](https://facebook.github.io/react-native/docs/getting-started.html).

#### Publishing
Use XCode to sign and publish your app.

### Server and Web
![Web Screenshot](/boilerplate/docs/images/web.png?raw=true)
#### SDK Setup
None.

#### Publishing

Publishing for the web is the simplest. Grab the files from `/build/web/production` and host them somewhere. GitHub Pages is good for static site hosting. Netlify is good too; it supports HTTPS via Let's Encrypt which is nice. If you want server-side rendering, you'll want to run the included server (or your own) in any Node instance.

Advanced Pro Tip: Use [Polyfill.io](https://polyfill.io/v2/docs/) and a lighter Babel transform preset for web code. This would mean a smaller app bundle size, with only the necessary code polyfilled for each browser. Make sure to properly set up the OfflinePlugin's service worker to properly cache the third-party polyfill script as an opaque resource. If you use an offline-first approach with Polyfill.io but don't cache the polyfill script, then when users visit the webapp offline it will be broken - the polyfill won't be there to get your app's code executing properly.

### Windows
![Windows Screenshot](/boilerplate/docs/images/windows.png?raw=true)
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
- [Progressive Web App](https://developers.google.com/web/progressive-web-apps/)
  - Progressive Web App features make the app [offline-first](https://github.com/NekR/offline-plugin) and installable to mobile home screens.
  - Automated [Lighthouse](https://github.com/GoogleChrome/lighthouse) testing (`gulp analyze web`) gives a scorecard for progressive web app usability.
  - [Favicons](https://github.com/haydenbleasel/favicons) for every browser and platform
  - PWA manifest generated by [forked favicons plugin](https://github.com/c-h-/favicons-webpack-plugin); configure in `/web/webpack/pwaConfig.js`
- Advanced bundle optimizations such as:
  - [Resource Hints](https://www.w3.org/TR/resource-hints/) for faster page load times
  - [Optimize JS](https://github.com/nolanlawson/optimize-js) potentially speeds up web app start times. Definitely test to ensure it actually improves start times for your app.
  - [React element inlining](https://babeljs.io/docs/plugins/transform-react-inline-elements/) as described well [here](http://techblog.netflix.com/2017/01/crafting-high-performance-tv-user.html).
  - [React constant elements](https://babeljs.io/docs/plugins/transform-react-constant-elements/)
  - Strip PropTypes in production
  - Generates a [Service Worker](https://github.com/NekR/offline-plugin) automatically. Enables offline use of the app and required to be a Progressive Web App.

### Notes and Tips
#### Git Dependencies
You may notice that a few dependencies point to forked git repositories. This is only to apply patches that haven't yet been pushed from the package being forked. When the upstream packages release the patches these git dependencies will be removed. 

#### React Performance
Try to limit passing dynamic props and passing props between React components wherever possible. [Netflix has good insights](http://techblog.netflix.com/2017/01/crafting-high-performance-tv-user.html) into the lengths you can go to maximize performance.

#### File Organization
The boilerplate is organized around app views (view=scene or page). This can help with code splitting to reduce web bundle sizes on initial load. It can also assist in keeping organized should the app grow to be a large codebase. Styles, view sub-components, redux action creators, and redux reducers are mostly in each view's subfolder. Everything that's app-wide is exterior to the `/js/views` folder, including app-wide reducers.

#### CSS
React Native supports a CSS-like API in JS for styling components, therefore No CSS has been added to the boilerplate (except for an icons on web).
It is possible to use CSS with the web platform only, but it's not recommended due to organizational issues that would be inevitable.

#### Supported JS Features
See the [official docs](https://facebook.github.io/react-native/docs/javascript-environment.html) for details of which JS features are supported by default.
The web platform DOES NOT use `/.babelrc`, it instead uses a babel configuration located at `/web/.babelrc.json` to enable the same features in a way that works with other plugins and tree shaking.

#### Platform Specific Code
It's easy to add native functionality to a React Native app and consume it from JS. See [official docs](https://facebook.github.io/react-native/docs/native-modules-ios.html) for details.

It's also easy to create JavaScript code that's platform-specific. Imagine you have a file `Button.js`. To add a version that only gets included on iOS, add a file named `Button.ios.js`. Now, when the file is `import`ed, the `Button.js` version will used on every platform except iOS. On iOS, the `Button.ios.js` version will be used. Other platform versions can be added using the following convention: `[filename].[platform].[extension]`.

#### Third-Party React Native Plugins
Not all React Native third party plugins work on every platform. An easy way to check compatibility is to see if the plugin requires native code. If it does, that means it won't work on any platform that there isn't native code written for. Some third-party plugins with native code break the web platform version. If this is the case, an easy solution is to only `import` the offending plugin in a platform-specific JS file. As of this writing it is difficult to add native modules to macOS.

#### Preventing Headaches and Refactors
To ensure your app works on every platform it's recommended to preview each enabled platform as you work, or at least preview each enabled platform often. This will help ensure that code written will work without hassle.

### Roadmap
The frontend world moves fast. As I have time I'll try to add more dev features and any new platforms released that are compatible with React Native and stable.

Platform | Feature | Notes
--- |--- | ---
All | Tests | Add basic tests: successfully build and render app on all platforms, etc.
All | AoT Compilation | Ahead of time compilation could reduce bundle sizes and start times. Angular 2 is the only framework that supports it right now.
All | Web Workers | Currently I'm of the opinion it's too much complexity to have web workers come standard.
All | Child Navigator | Potentially add a child navigator if it doesn't add too much complexity.
Android | Android sign, zipalign, and optimize | It would be nice to have signing, zipaligning, and optimization (like Redex) built-in.
iOS | Build | Use gulp CLI to build iOS IPA files.
macOS | Build | Use gulp CLI to build macOS packages.
macOS | Quality | Work with macOS version to fix quality issues.
macOS | I18n | [Internationalization support blocked](https://github.com/ptmt/react-native-macos/issues/149)
Server | Remove Hotfix | Remove the hotfix that currently gets server side rendering to match checksum.
Web | Lighter bundles with Polyfill | Putting together an example webpack config that utilizes polyfill.io to lighten bundle sizes compatible with Service Workers, perhaps in another branch, would be great.
Web | Web HMR | Web Hot Module Reloading would be lovely, but unfortunately [doesn't appear to be possible right now](https://github.com/gaearon/react-hot-loader/issues/262).
Web | Alternative React backends | [Currently not possible](https://github.com/necolas/react-native-web/issues/330)
Web | Parallelized builds | [Currently broken](https://github.com/amireh/happypack/issues/128)
Web | Code Splitting | Currently I'm of the opinion it's too much complexity to have code splitting come standard.
Windows | Build | Use gulp CLI to build Windows packages.
