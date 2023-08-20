const electron = require('electron')
const ffmpeg = require('fluent-ffmpeg')
const path = require('path')
const _ = require('lodash')
// constants
const { views, VIEW } = require('./src/utils/views')
const promises = require('./src/utils/video-resolve')
const { STATE, WINDOW, IPCID, DEFAULT } = require('./src/constants')

const { app, BrowserWindow, ipcMain } = electron

let mainWindow

app.on(STATE.READY, () => {
  mainWindow = new BrowserWindow(WINDOW.MAIN)
  mainWindow.loadURL(views(VIEW.page))
})

ipcMain.on(IPCID.VIDEOS_ADDED, (event, videos) => {
  const Promises = promises(videos)

  Promise.all(Promises).then((results) => {
    mainWindow.webContents.send(IPCID.META_COMPLETE, results)
  })
})

ipcMain.on(IPCID.CONVERT_START, (event, videos) => {
  _.each(videos, (video) => {
    const outputDirectory = video.path.split(video.name)[0]
    const outputName = video.name.split('.')[0]
    const outputPath = path.join(
      outputDirectory,
      `${outputName}_nasty.${video.format}`
    )

    ffmpeg(video.path)
      .output(outputPath)
      .on(STATE.END, () => {
        console.log('Video conversion complete')
      })
      .run()
  })
})
