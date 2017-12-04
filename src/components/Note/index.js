import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Waypoint from 'react-waypoint';
import { hash } from '../../utils' 

class Note extends Component {
  static contextTypes = {
    scrollWatcher: PropTypes.object,
  }

  onEnter(){
    const { content } = this.props
    const { scrollWatcher } = this.context
    scrollWatcher.addNote(this.hash, content)
  }

  onLeave(){
    const { scrollWatcher } = this.context
    scrollWatcher.removeNote(this.hash)
  }

  render(){
    const { content, children } = this.props
    this.hash = ~hash(content.substring(0,20)) + ''
    return (
      <Waypoint 
        key={this.hash}
        onEnter={() => this.onEnter()}
        onLeave={() => this.onLeave()}
        topOffset={-100}
        bottomOffset={-200}
        >
        <span>{ content }</span>
      </Waypoint>
    )
  }
}

export default Note
