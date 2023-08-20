const electron = require('electron')
const ffmpeg = require('fluent-ffmpeg')
const _ = require('lodash')
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
  const promises = _.map(videos, (video) => {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(video.path, (err, metadata) => {
        video.duration = metadata.format.duration
        video.format = 'avi'
        resolve(video)
      })
    })
  })

  Promise.all(promises).then((results) => {
    mainWindow.webContents.send(IPCID.META_COMPLETE, results)
  })
})
