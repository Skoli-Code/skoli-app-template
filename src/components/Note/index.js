import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Waypoint from 'react-waypoint'
import styled from 'styled-components'
import Link from '../Link'
import Bold from '../Bold'

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

  render(){
    const {
      inBottomBar,
      text,
      children,
      id
    } = this.props
  
    return (
      // this innerRef settings is here to make <Waypoint> works 
      // in components/WatchScrollContent/watchScroll.
      // See https://github.com/brigade/react-waypoint#children
      <Holder innerRef={this.props.innerRef}>
        { inBottomBar && (<Bold>{ id }.&nbsp;</Bold>)}
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
