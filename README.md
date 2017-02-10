# Universal Native Boilerplate

It's possible to share the majority of a frontend codebase across platforms. Build a native rendered app for iOS, Android, Windows, macOS, web, and server-side rendering using React and React Native.

This boilerplate is meant to be a fairly non-opinionated starting place for devs who want to build an app that compiles for many native targets and shares the majority of its codebase.

Familiarity with React and React Native is recommended before using this boilerplate.

## Quick Start

### Installation
1. Download the boilerplate code:
```sh
git clone https://github.com/c-h-/universal-native-boilerplate.git my-app
cd my-app
```

2. If you have yarn: `yarn install`, otherwise: `npm install`

3. Configure git properly: `npm run setup`

4. Configure the new package properly: `npm init`

### Configure
#### iOS
Configure your computer to compile iOS apps following the [official getting started guide](https://facebook.github.io/react-native/docs/getting-started.html).

#### Android
Configure your computer to compile iOS apps following the [official getting started guide](https://facebook.github.io/react-native/docs/getting-started.html).

#### Windows
If this is first time using UWP, open the solution file with Visual Studio 2015 (`./windows/UniversalNativeBoilerplate.sln`). After opening the solution, right click the Solution in the Solution Explorer and select the option labeled "Install Missing Components". You may have to shutdown Visual Studio to continue the installation.

For reference: [official getting started guide and requirements](https://github.com/ReactWindows/react-native-windows#getting-started).

#### Web
Nothing :P