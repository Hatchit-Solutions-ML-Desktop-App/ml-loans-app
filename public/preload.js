const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  // SEND NOTIFICATION
  sendNotification: (title, body) => {
    ipcRenderer.send("notify", title, body);
  },
});
