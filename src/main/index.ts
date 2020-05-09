/**
 * Entry point of the Election app.
 */
import { app, BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import os from 'os';
import path from 'path';
import { forwardToRenderer, replayActionMain } from 'electron-redux';
import { createStore, applyMiddleware } from 'redux';

import { rootReducer } from '../shared/store';

const store = createStore(
  rootReducer,
  applyMiddleware(forwardToRenderer)
);

replayActionMain(store);

let mainWindow: Nullable<BrowserWindow>;

function createWindow() {
  if (process.env.NODE_ENV !== 'production') {
    BrowserWindow.addDevToolsExtension(
      path.join(os.homedir(), '.config/chromium/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.0_0')
    );
  }

  // Create the browser window.
  const options: BrowserWindowConstructorOptions = {
    height: 600,
    width: 800,
    webPreferences: {
      webSecurity: true,
      devTools: process.env.NODE_ENV === 'production' ? false : true,
    },
  };
  if (process.env.NODE_ENV !== 'production') {
    options.webPreferences = options.webPreferences || {};
    options.webPreferences.preload = path.resolve(__dirname, 'main/preload.js');
  }
  mainWindow = new BrowserWindow(options);

  // And load the index.html of the app.
  mainWindow
    .loadURL(
      // url.format({
      //   pathname: path.join(__dirname, './index.html'),
      //   protocol: 'file:',
      //   slashes: true,
      // })
      'http://localhost:8000'
    )
    .catch(error => console.log(`Failed to load BrowserWindow, error: ${error}`));

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
