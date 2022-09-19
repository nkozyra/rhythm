const { app, BrowserWindow } = require('electron');
const path = require('path');

try {
  require('electron-reloader')(module)
} catch (_) {}

const createWindow = () => {
  const win = new BrowserWindow({
    show: false,
    nodeIntegration: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  win.maximize();
  win.show();
  win.loadFile('index.html')
};

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});

app.on('window-all-closed', () => {
  app.quit()
});

