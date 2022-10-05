const { app } = require("electron");
const { autoUpdater } = require("electron-updater");
const isDev = require("electron-is-dev");

const mainMenuTemplate = [
  // FILE
  {
    label: "File",
    submenu: [
      {
        label: "Quit App",
        accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        },
      },
    ],
  },
  //   VIEW
  {
    label: "View",
  },
  //   WINDOW
  {
    label: "Window",
    submenu: [
      {
        label: "Minimize Window",
        accelerator: "CmdOrCtrl+M",
        role: "minimize",
      },
      {
        label: "Maximize Window",
        accelerator: "CmdOrCtrl+Shift+M",
        role: "maximize",
      },
    ],
  },
  //   HELP
  {
    label: "Help",
    submenu: [
      {
        label: "About",
      },
      {
        label: "Toggle DevTools",
        accelerator: "CmdOrCtrl+Shift+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      {
        label: "Check for Updates",
        click() {
          if (!isDev) {
            autoUpdater.checkForUpdates();
          }
        },
      },
    ],
  },
  //   SYNC
  {
    label: "Sync",
  },
];

module.exports = mainMenuTemplate;
