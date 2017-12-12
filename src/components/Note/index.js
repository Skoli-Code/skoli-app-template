import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Waypoint from 'react-waypoint';

import NoteModal from '../NoteModal'
import { hash } from '../../utils' 

class Note extends Component {
  static contextTypes = {
    scrollWatcher: PropTypes.object,
  }

  static defaultProps = {
    watchScroll: true
  }

  constructor(props){
    super(props)
    this.state = {
      noteOpened: false
    }
  }
  
  watcher(){
    return this.context.scrollWatcher
  }

  openNote(){
    const watcher = this.watcher()
    watcher.setNoteModalContent(this.props.children)
    watcher.openNoteModal()
  }

  closeNote(){
    this.setState({ noteOpened: false })
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
    const { watchScroll, content, children } = this.props
    const { noteOpened } = this.state
    this.hash = ~hash(content.substring(0,20)) + ''
    const noteContent = (<span>
        <a onClick={()=>this.openNote()}>{ content }</a>
    </span>)
    if(watchScroll){
      return (
        <Waypoint 
          key={this.hash}
          onEnter={() => this.onEnter()}
          onLeave={() => this.onLeave()}
          topOffset={-100}
          bottomOffset={-200}
          >
          { noteContent }
        </Waypoint>
      )
    } else {
      return noteContent
    }
  }
}

export default Note
