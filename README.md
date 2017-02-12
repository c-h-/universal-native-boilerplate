# Universal Native Boilerplate

Using this boilerplate it's easy to build an app that compiles natively for every major platform while sharing user interface and business logic. It's powered by React, React Native, and community extensions.

This boilerplate is meant to be an hassle-free project starting point. Since platforms and features are by default disabled, you get to be opinionated about which ones to enable.

Simply get the boilerplate and enable the platforms and features you need.

A command line interface is included with the boilerplate that should aid in development and maintenance for the life of the project. It's easily extendable by adding Gulp tasks.

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

### Notes and Tips
#### Platform Specific Code
It's easy to add native functionality to a React Native and consume it from JS. See [official docs](https://facebook.github.io/react-native/docs/native-modules-ios.html) for details.

It's also easy to create JavaScript code that's platform-specific. Imagine you have a file `Button.js`. To add a version that only gets included on iOS, add a file named `Button.ios.js`. Now, when the file is `import`ed, the `Button.js` version will used on every platform except iOS. On iOS, the `Button.ios.js` bersion will be used. Other platform versions can be added using the following convention: `[filename].[platform].[extension]`.

#### Third-Party React Native Plugins
Not all React Native third party plugins work on every platform. An easy way to check compatibility is to see if the plugin requires native code. If it does, that means it won't work on any platform that there isn't native code written for. Some third-party plugins with native code break the web platform version. If this is the case, an easy solution is to only `import` the offending plugin in a platform-specific JS file.

#### Preventing Headaches and Refactors
To ensure your app works on every platform it's recommended to preview each enabled platform as you work, or at least preview each enabled platform often. This will help ensure that code written will work without hassle.