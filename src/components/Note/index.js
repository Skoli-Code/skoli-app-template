import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Waypoint from 'react-waypoint'
import styled from 'styled-components'
import Link from '../Link'
import NoteModal from '../NoteModal'
import { hash } from '../../utils' 

const Holder = styled.span`
  font-weight: bold;
  cursor: pointer;
`

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
    scrollWatcher.showNote(this.hash)
  }

  onLeave(){
    const { scrollWatcher } = this.context
    scrollWatcher.hideNote(this.hash)
  }

  render(){
    const { watchScroll, content, children } = this.props
    const { noteOpened } = this.state
    this.hash = ~hash(content.substring(0,20)) + ''

    const { letter } = this.watcher().addNote(this.hash, content, children)
    const noteContent = (
      <Holder>
        { !watchScroll && (<span>{ letter }.&nbsp;</span>)}
        <Link onClick={()=>this.openNote()}>
          { content }
          { watchScroll && (
            <sup>{ letter }</sup>
          )}
        </Link>
      </Holder>
    )
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
