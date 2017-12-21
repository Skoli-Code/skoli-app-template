/** 
 * Note system: detect notes on scroll & show them in bottom bar.
 */ 
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Waypoint from 'react-waypoint'
import styled, { css } from 'styled-components'
import { size, palette } from 'styled-theme'
import { ifProp } from 'styled-tools'

import BottomBar from './BottomBar'
import NoteModal from '../NoteModal'

import { sleep } from '../../utils'

const ScrollWrapper = styled.div`
  ${ifProp('isFixed', css`
    padding-bottom: ${size('bottomBarHeight')}; 
  `)}
`
const Content = styled.div`
  overflow: hidden;
`

class WatchScrollContent extends Component {
  static childContextTypes = {
    scrollWatcher: PropTypes.object,
  }
  
  getChildContext(){
    return { scrollWatcher: this }
  }
  
  constructor(props){
    super(props)
    this.state = {
      notes: {},
      refs: {},
      isNoteModalOpen: false,
      isDynamicBottomBarEnabled: true,
      noteModalContent: null
    }
  }

  async setNoteModalContent(content){
    this.closeNoteModal()
    await sleep(300)
    this.setState({ noteModalContent: content })
    this.openNoteModal()
  }

  openNoteModal(){
    this.setState({ isNoteModalOpen: true })
  }

  closeNoteModal(){
    this.setState({ isNoteModalOpen: false })
  }
  
  addElement({ collection, numbering, ...props }){
    const elements = this.state[collection] = this.state[collection] || {}
    let id = Object.keys(elements).length + 1
    if(!numbering){
      id = String.fromCharCode(96 + id)
    }
    const element = { id, visible: false, ...props }
    elements[id] = element
    return element
  }
  
  showElement(key, collection, v = true){
    const elements = this.state[collection]
    const element = elements[key]
    element.visible = v
    // console.log(v ? 'show' : 'hide', key, collection, element)
    this.setState({ [collection]: elements })
  }
  
  hideElement(key, collection){
    this.showElement(key, collection, false)
  }

  collection(collection){
    const elements = this.state[collection]
    return Object.keys(elements).map(key => elements[key])
  }
  
  visibleCollection(collection){
    return this.collection(collection)
      .filter(element => element.visible)
  }
  
  enableFixedBar(){
    this.setState({
      isDynamicBottomBarEnabled: true
    })
  }
  
  disableFixedBar(){
    this.setState({
      isDynamicBottomBarEnabled: false
    })
  }
  render(){
    const { children } = this.props
    const { isNoteModalOpen, noteModalContent, isDynamicBottomBarEnabled } = this.state
    let notes = this.collection('notes')
    let refs = this.collection('refs')
    const isVisible = el => el.visible
    const visibleNotes = notes.filter(isVisible)
    const visibleRefs = refs.filter(isVisible)
    const isDynamicBottomBarVisible = isDynamicBottomBarEnabled && (visibleNotes.length + visibleRefs.length) > 0

    console.log('isDynamicBottomBarVisible ?', isDynamicBottomBarVisible)

    return (
      <ScrollWrapper isFixed={isDynamicBottomBarVisible}>
        <Content>
          { children }
          <Waypoint
            onEnter={() => this.disableFixedBar()}
            onLeave={() => this.enableFixedBar()}
          >
          <BottomBar isVisible={true} isFixed={false} notes={notes} refs={refs} />
          </Waypoint>
        </Content>
        <BottomBar isVisible={isDynamicBottomBarVisible} isFixed={true} notes={visibleNotes} refs={visibleRefs} />
        <NoteModal isOpen={isNoteModalOpen} content={noteModalContent}/>
      </ScrollWrapper>
    )
  }
}

export default WatchScrollContent
