const path = require("path");

const {app, BrowserWindow, ipcMain} = require("electron");
const isDev = require("electron-is-dev");
const {channels} = require("../src/shared/constants");

let installExtension, REACT_DEVELOPER_TOOLS, win;

if (isDev) {
    const devTools = require("electron-devtools-installer");
    installExtension = devTools.default;
    REACT_DEVELOPER_TOOLS = devTools.REACT_DEVELOPER_TOOLS;
}

if (require("electron-squirrel-startup")) {
    app.quit();
}

function createWindow() {
    win = new BrowserWindow({
        width: 1200,
        height: 768,
        minWidth: 1200,
        minHeight: 768,
        frame: false,
        shadow: true,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js")
        }
    });

    win.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );

    initializeDownloadEvents();
}

app.whenReady().then(() => {
    createWindow();

    if (isDev) {
        installExtension(REACT_DEVELOPER_TOOLS)
            .then(name => console.log(`Added Extension: ${name}`))
            .catch(error => console.log(`An error occurred: , ${error}`));
    }
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

ipcMain.on(channels.APP_INFO, event => {
    event.sender.send(channels.APP_INFO, app.getVersion());
});

ipcMain.on(channels.TITLE_BAR, (event, arg) => {
    if (arg === "minimize") {
        win.minimize();
    } else if (arg === "maximize") {
        if (win.isMaximized()) {
            win.unmaximize();
        } else {
            win.maximize();
        }
    } else if (arg === "close") {
        win.close();
    }
});

let downloadItem;

ipcMain.on(channels.DOWNLOAD_START, (event, arg) => {
    win.webContents.downloadURL(arg);
});

ipcMain.on(channels.DOWNLOAD_PAUSE, () => {
    downloadItem.isPaused() ? downloadItem.resume() : downloadItem.pause();
});

ipcMain.on(channels.DOWNLOAD_CANCEL, () => {
    downloadItem.cancel();
});

function initializeDownloadEvents() {
    win.webContents.session.on("will-download", (event, item, webContents) => {
        item.setSavePath(path.join(path.join(__dirname, '../download/'), item.getFilename()));
        win.send(channels.DOWNLOAD_INFO, {fileName: item.getFilename()});
        let lastReceivedBytes = 0;
        item.on("updated", (event, state) => {
            downloadItem = item;
            if (state === "interrupted") {
                console.log("Download is interrupted but can be resumed");
            } else if (state === "progressing") {
                if (item.isPaused()) {
                    console.log("Download is paused");
                } else {
                    win.send(channels.DOWNLOAD_PROGRESS, {
                        current: item.getReceivedBytes(),
                        total: item.getTotalBytes(),
                        speed: item.getReceivedBytes() - lastReceivedBytes
                    });
                    //console.log(`Received bytes: ${item.getReceivedBytes()} of ${item.getTotalBytes()}`);
                    lastReceivedBytes = item.getReceivedBytes();
                }
            }
        });

        item.once("done", (event, state) => {
            if (state === "completed") {
                console.log("Download successfully");
                win.send(channels.DOWNLOAD_COMPLETE);
            } else {
                console.log(`Download failed: ${state}`);
            }
        });
    });
}
