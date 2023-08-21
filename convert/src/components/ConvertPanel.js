import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as actions from '../actions'

class ConvertPanel extends Component {
  onCancelPressed = () => {
    this.props.removeAllVideos()
    this.props.history.push('/')
  }

  render() {
    return (
      <div className='convert-panel'>
        <button className='btn black darken-3' onClick={this.onCancelPressed}>
          <b>Cancel</b>
        </button>
        <button className='btn purple' onClick={this.props.convertVideos}>
          <b> Go NASTY!</b>
        </button>
      </div>
    )
  }
}

export default withRouter(connect(null, actions)(ConvertPanel))
