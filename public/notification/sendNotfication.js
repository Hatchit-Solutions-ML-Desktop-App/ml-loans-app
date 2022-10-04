const { ipcMain, Notification } = require("electron");

function sendNofication() {
  // IPC MAIN PROCESS
  ipcMain.on("notify", (event, title, body) => {
    new Notification({ title, body }).show();
  });
}

module.exports = sendNofication;
