import _ from 'lodash'
import moment from 'moment'
import 'moment-duration-format'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import VIDEO_FORMATS from '../constants/formats'
import { AiOutlineFolderOpen } from 'react-icons/ai'

class VideoList extends Component {
  showStatus({ complete, timemark, outputPath, err }) {
    if (complete) {
      return (
        <button
          onClick={() => this.props.onFolderOpen(outputPath)}
          className='btn bg-purple'
        >
          <div>
            <AiOutlineFolderOpen />
            <b> Open Folder</b>
          </div>
        </button>
      )
    } else if (err) {
      return <p className='red-text'>{err}</p>
    }
    return ''
  }

  renderProgressBar = ({ duration, timemark, complete }) => {
    if (timemark) {
      return `${
        100 - moment.duration(timemark).asMilliseconds() / (duration * 10)
      }%`
    } else if (complete) {
      return '0%'
    } else {
      return '100%'
    }
  }

  renderVideos() {
    return _.map(this.props.videos, (video) => {
      const {
        name,
        path,
        duration,
        format,
        timemark,
        complete,
        outputPath,
        err,
      } = video
      const formatedDuration = moment
        .duration(duration, 's')
        .format('hh:mm:ss', { trim: false })
      return (
        <li className='collection-item avatar black black-yellow' key={path}>
          <div
            style={{
              ...styles.progressBar,
              right: this.renderProgressBar(video),
            }}
          />
          <i
            className='material-icons circle btn-floating btn-small red'
            onClick={() => this.props.removeVideo(video)}
          >
            clear
          </i>
          <div style={styles.fileName} className='black'>
            <p>{name}</p>
            <p>{formatedDuration}</p>
          </div>
          <div
            className='primary-content black-text'
            style={styles.secondaryContent}
          >
            <select
              className={
                complete || timemark
                  ? 'hidden'
                  : 'browser-default right large bold'
              }
              value={format}
              onChange={(e) => this.props.onFormatChange(video, e.target.value)}
            >
              {VIDEO_FORMATS.map((outFormat) => (
                <option key={outFormat.value} value={outFormat.value}>
                  <b>{outFormat.option}</b>
                </option>
              ))}
            </select>
            {this.showStatus({ complete, timemark, outputPath, err })}
          </div>
        </li>
      )
    })
  }

  render() {
    return <ul className='collection video-list'>{this.renderVideos()}</ul>
  }
}

const styles = {
  progressBar: {
    transitionProperty: 'right',
    transitionDuration: '0.25s',
    position: 'absolute',
    zIndex: 0,
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'purple',
    opacity: 0.3,
  },
  secondaryContent: {
    zIndex: 1,
    width: '180px',
    top: 'auto',
    botton: 'auto',
  },
  fileName: {
    width: '65%',
  },
}

export default VideoList
