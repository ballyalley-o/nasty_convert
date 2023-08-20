const electron = require('electron')
const ffmpeg = require('fluent-ffmpeg')
// constants
const { views, VIEW } = require('./src/utils/views')
// constants
const { STATE, WINDOW, IPCID } = require('./src/constants')

const { app, BrowserWindow, ipcMain } = electron

let mainWindow

app.on(STATE.READY, () => {
  mainWindow = new BrowserWindow(WINDOW.MAIN)
  mainWindow.loadURL(views(VIEW.page))
})

ipcMain.on(IPCID.VIDEOS_ADDED, (event, videos) => {
  const promise = new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videos[0].path, (err, metadata) => {
      resolve(metadata)
    })
  })
  promise.then((metadata) => {
    console.log(metadata)
  })
})
