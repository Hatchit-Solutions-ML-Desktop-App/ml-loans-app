const isDev = require('electron-is-dev');
const { app, BrowserWindow, Menu, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');

const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      { label: 'New Window' },
      {
        label: 'Preferences',
        submenu: [{ label: 'Settings' }, { label: 'Themes' }],
      },
      { type: 'separator' },
      {
        label: 'Exit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        },
      },
    ],
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Minimize Window',
        accelerator: process.platform === 'darwin' ? 'Command+M' : 'Ctrl+M',
        click() {
          BrowserWindow.getFocusedWindow().minimize();
        },
      },
      {
        label: 'Maximize Window',
        accelerator:
          process.platform === 'darwin' ? 'Command+Shift+M' : 'Ctrl+Shift+M',
        click() {
          BrowserWindow.getFocusedWindow().maximize();
        },
      },
      { type: 'separator' },
      {
        label: 'Full Screen',
        accelerator:
          process.platform === 'darwin' ? 'Command+Shift+F' : 'Ctrl+Shift+F',
        click() {
          BrowserWindow.getFocusedWindow().setFullScreen(
            !BrowserWindow.getFocusedWindow().isFullScreen()
          );
        },
      },
      {
        label: 'Exit Full Screen',
        accelerator:
          process.platform === 'darwin' ? 'Command+Shift+F' : 'Ctrl+Shift+F',
        click() {
          BrowserWindow.getFocusedWindow().setFullScreen(
            !BrowserWindow.getFocusedWindow().isFullScreen()
          );
        },
      },
    ],
  },
  {
    label: 'Help',
    submenu: [
      { label: 'Privacy Policy' },
      { label: 'Terms of Service' },
      { type: 'separator' },
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      {
        label: 'Check for Updates',
        click() {
          if (!isDev) {
            autoUpdater.checkForUpdates();
          }
        },
      },
      { type: 'separator' },
      { label: 'About' },
    ],
  },
  {
    label: 'Sync',
  },
];

module.exports = mainMenuTemplate;
