const electron = require("electron");
const { app, BrowserWindow, screen, ipcMain, dialog } = electron;
const url = require("url");
const path = require("path");

const serverIp = "http://localhost:34243";

//Server
require("./server");

const options = {
  minWidth: 800,
  minHeight: 600,
};

let mainWindow;
const pathToIcon = path.join(__dirname, "icon.ico");

//Only for development - live reload
require("electron-reload")(__dirname);

app.on("ready", () => {
  //Get the screen size
  let { width, height } = screen.getPrimaryDisplay().workAreaSize;
  //Set the app size to 70% of width and 85% of height
  width *= 0.7;
  height *= 0.85;

  //Create the browser window
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    minWidth: options.minWidth,
    minHeight: options.minHeight,
    icon: pathToIcon,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  //Load the site into the window
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "build", "index.html"),
      protocol: "file",
    })
  );

  mainWindow.setTitle("YouTube Downloader");

  //Hide the menu - the app doesn't use it
  mainWindow.setMenu(null);

  //DEV - Open dev tools
  //mainWindow.webContents.openDevTools();

  //When the download process begins, create a indeterminate progress bar on the icon
  ipcMain.on("downloading", () => {
    mainWindow.setProgressBar(2);
  });

  //When the video has been downloaded, flash the icon on the taskbar and remove the progress bar
  ipcMain.on("downloaded", () => {
    mainWindow.setProgressBar(-1);
    mainWindow.flashFrame(true);
  });

  //When user clicks on the application icon (so enters it)
  mainWindow.on("focus", () => {
    //Stop flashing the icon
    mainWindow.flashFrame(false);
  });
});
