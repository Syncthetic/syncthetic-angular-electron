import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';
import * as url from 'url';

const download = require('electron-dl').download
let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

let launchedFromUpdate = args.some(val => val.includes('--remove-app='))
let removeApplication
if ( launchedFromUpdate ) removeApplication = args.find(arg => { return arg.includes('--remove-app') }).split('=')[1]

console.log('I should implement logic to remove the app:', removeApplication)

const electron = require('electron')
const ipcMain = electron.ipcMain

ipcMain.on('download', (ev, args) => {
  args.properties.onProgress = status => win.webContents.send("download progress", status);

  download(BrowserWindow.getFocusedWindow(), args.url, args.properties)
    .then(dl => win.webContents.send("download complete", dl.getSavePath()) )
    .catch(console.error);
})


function createWindow() {
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    icon: path.join(__dirname, 'dist/assets/icons/icon.png')
  })

  require('electron-context-menu')({
    prepend: (params, win) => [{
      label: 'Rainbow',
      // Only show it when right-clicking images
      visible: params.mediaType === 'image',
    }]
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  // win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

}

try {

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
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}