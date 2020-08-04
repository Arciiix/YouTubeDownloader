const electron = require("electron");
const { app, BrowserWindow, screen } = electron;
const url = require("url");
const path = require("path");

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
  mainWindow.webContents.openDevTools();
});
