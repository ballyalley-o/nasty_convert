const ffmpeg = require('fluent-ffmpeg')
const _ = require('lodash')
const { DEFAULT } = require('../constants')

const promises = (videos) =>
  _.map(videos, (video) => {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(video.path, (err, metadata) => {
        video.duration = metadata.format.duration
        video.format = DEFAULT.FORMAT.AVI
        resolve(video)
      })
    })
  })

module.exports = promises
