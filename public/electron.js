// ELECTRON MODULES
const { app, BrowserWindow, Menu } = require("electron");

// NODE MODULES
const path = require("path");

// DEPENDENCIES
const isDev = require("electron-is-dev");

// OTHERS
const sendNofication = require("./notification/sendNotfication");
const mainMenuTemplate = require("./mainMenu/mainMenu");

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

// IPC MAIN PROCESS
sendNofication();
