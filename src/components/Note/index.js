import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Waypoint from 'react-waypoint'
import styled from 'styled-components'
import Link from '../Link'

import watchScroll from '../WatchScrollContent/watchScroll'

const Holder = styled.span`
  cursor: pointer;
`

class Note extends Component {
  state = {
    noteOpened: false
  }
  
  openNote(){
    const { watcher } = this.props
    watcher.setNoteModalContent(this.props.children)
    watcher.openNoteModal()
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
    const {
      inBottomBar,
      text,
      children,
      id
    } = this.props
  
    return (
      <Holder>
        { inBottomBar && (<span>{ id }.&nbsp;</span>)}
        <Link onClick={()=>this.openNote()}>
          { text }
          { !inBottomBar && (
            <sup>{ id }</sup>
          )}
        </Link>
      </Holder>
    )
  }
}

export default watchScroll(Note, {
  collection: 'notes',
  numbering: false
})
