import { ipcRenderer } from 'electron'
import {
  ADD_VIDEO,
  ADD_VIDEOS,
  REMOVE_VIDEO,
  REMOVE_ALL_VIDEOS,
  VIDEO_PROGRESS,
  VIDEO_COMPLETE,
} from './types'
import _ from 'lodash'
// constants
import { IPCID } from '../constants'

// TODO: Communicate to MainWindow process that videos
// have been added and are pending conversion
export const addVideos = (videos) => (dispatch) => {
  ipcRenderer.send(IPCID.VIDEOS_ADDED, videos)
  ipcRenderer.on(IPCID.META_COMPLETE, (event, videosData) => {
    dispatch({
      type: ADD_VIDEOS,
      payload: videosData,
    })
  })
}

// TODO: Communicate to MainWindow that the user wants
// to start converting videos.  Also listen for feedback
// from the MainWindow regarding the current state of
// conversion.
export const convertVideos = () => (dispatch, getState) => {
  const videos = _.map(getState().videos)
  ipcRenderer.send(IPCID.CONVERT_START, videos)
  ipcRenderer.on(IPCID.CONVERT_END, (event, { video, outputPath }) => {
    dispatch({ type: VIDEO_COMPLETE, payload: { ...video, outputPath } })
  })

  ipcRenderer.on(IPCID.CONVERT_PROGRESS, (event, { video, timemark }) => {
    dispatch({ type: VIDEO_PROGRESS, payload: { ...video, timemark } })
  })
}

// TODO: Open the folder that the newly created video
// exists in
export const showInFolder = (outputPath) => (dispatch) => {
  ipcRenderer.send(IPCID.SHOW_FOLDER, outputPath)
}

export const addVideo = (video) => {
  return {
    type: ADD_VIDEO,
    payload: { ...video },
  }
}

export const setFormat = (video, format) => {
  return {
    type: ADD_VIDEO,
    payload: { ...video, format, err: '' },
  }
}

export const removeVideo = (video) => {
  return {
    type: REMOVE_VIDEO,
    payload: video,
  }
}

export const removeAllVideos = () => {
  return {
    type: REMOVE_ALL_VIDEOS,
  }
}
