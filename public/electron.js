// ELECTRON MODULES
const { app, BrowserWindow, Menu, dialog } = require("electron");

// NODE MODULES
const path = require("path");

// DEPENDENCIES
const isDev = require("electron-is-dev");
const { autoUpdater } = require("electron-updater");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
};

app.whenReady().then(() => {
  createWindow();

  // MAIN MENU
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

autoUpdater.on("update-available", (_event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: "info",
    buttons: ["Ok"],
    title: "Application Update",
    message: process.platform === "win32" ? releaseNotes : releaseName,
    detail: "A new version is being downloaded.",
  };
  dialog.showMessageBox(dialogOpts, (response) => {});
});

autoUpdater.on("update-downloaded", (_event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: "info",
    buttons: ["Restart", "Later"],
    title: "Application Update",
    message: process.platform === "win32" ? releaseNotes : releaseName,
    detail:
      "A new version has been downloaded. Restart the application to apply the updates.",
  };
  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall();
  });
});

autoUpdater.on("update-not-available", (_event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: "info",
    buttons: ["Ok"],
    title: "No update Available",
    message: process.platform === "win32" ? releaseNotes : releaseName,
    detail: "No update available.",
  };
  dialog.showMessageBox(dialogOpts, (response) => {});
});

const mainMenuTemplate = [
  //   HELP
  {
    label: "Help",
    submenu: [
      {
        label: "About",
      },
      {
        label: "View License",
      },
      {
        label: "Privacy Policy and Terms of Use",
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
];
