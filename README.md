# Applia
A drag-and-drop editor for creating web applications.

[![Build Status](https://travis-ci.com/hunterchristian/Applia.svg?token=qLzSkFjss8AyEky4m4yq&branch=master)](https://travis-ci.com/hunterchristian/Applia)

_Created using the following boilerplate: https://github.com/Devtography/electron-react-typescript-webpack-boilerplate_

## Getting started
### Local development
1. __Clone down the repository__
    ```
    git clone git@github.com:hunterchristian/Applia.git
    ```
2. __Install project dependencies and configure git hooks__
    ```
    cd Applia
    yarn init
    ```
3. __Build the code.__ This will run webpack in "watch" mode, which will re-trigger the build whenever changes to source files are detected. This step should not be confused with "yarn release", which takes the output of the build and packages it into an installer.
  
    To build the code with sourcemaps and other options which are helpful for local debugging:
    ```
    yarn build:dev
    ```

    To build an optimized version of the code for production use:
    ```
    yarn build:prod
    ```

4. __Run the output of the build.__ This will need to be performed in a separate terminal window, since the `yarn build:dev` process will be running in the current terminal window (process does not exit since it watches the source files).
    ```
    yarn start
    ```
### Building the installer
The installer is what users will run to install the application on their machines. It is created with [electron-builder](https://github.com/electron-userland/electron-builder).

For macOS, execute:
  ```bash
  yarn release:mac
  ```

For Windows, execute:
  ```bash
  yarn release:win
  ```
_** `asar` archiving is disabled by default in Windows build as it can cause 
errors while running the installed Electron app based on previous experiences, 
whereas the macOS build with `asar` enabled works just fine. You can turn it 
back on by removing line 23 (`"asar": false`) in `package.json`. **_

#### Extra options
The release scripts are pre-configured to build 64 bit installers, since 64 bit 
is the standard for modern applications. 32 bit builds are still 
possible by changing the build scripts in `package.json` in the following way:
```json
// from
"scripts": {
    ...
    "release:win": "electron-builder build --win --x64",
    "release:mac": "electron-builder build --mac --x64"
},

// to
"scripts": {
    ...
    "release:win": "electron-builder build --win --ia32",
    "release:mac": "electron-builder build --mac --ia32"
},
```

Builds for Linux, armv71, and arm64 can also be configured by modifying the 
build scripts in `package.json`, but those aren't tested yet. For details, 
please refer to [documents of `electron-builder`](https://www.electron.build/cli).

## Folder structure
```
electron-react-typescript-base-proj/
| - dist/               //- Generated by build:dev and build:prod (Webpack) automatically
| - node_modules/
| - out/                //- Generated by release script automatically
| - public/             //- Global static assets
| | - index.html
| | - style.css
| - src/
| | - main/             //- Backend modules for the Electron app
| | | - main.ts         //- Entry point of 'electron-main'
| | - models/
| | - renderer/         //- Frontend React components for the Electron app
| | | - components/    //- UI components
| | | - renderer.tsx    //- Entry point of 'electron-renderer'
| - .eslintrc           //- ESLint config
| - .gitignore
| - package-lock.json
| - package.json
| - tsconfig.json       //- TypeScript config
| - tslint.json         //- TSLint config
| - webpack.config.js   //- Webpack config
```

## Debugging
Press `ctrl+option+i` to open the Chrome dev tools and inspect the application.

### Devtron
Devtron is an open source tool to help inspect, monitor, and debug an Electron app. It can be accessed by opening Chrome developer tools and clicking on the "Devtron" tab. Debugging with Devtron is explained in further detail here: https://electronjs.org/devtron 
