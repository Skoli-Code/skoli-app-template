/** 
 * Note system: detect notes on scroll & show them in bottom bar.
 */ 
import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
  
  render(){
    const { children } = this.props
    const { isNoteModalOpen, noteModalContent } = this.state
    let notes = this.collection('notes')
    let refs = this.collection('refs')
    const isVisible = el => el.visible
    const visibleNotes = notes.filter(isVisible)
    const visibleRefs = refs.filter(isVisible)
    const isFixed = (visibleNotes.length + visibleRefs.length) > 0
    notes = isFixed ? visibleNotes : notes
    refs = isFixed ? visibleRefs : refs
    const bottomBarProps = { notes, refs, isFixed }

    return (
      <ScrollWrapper isFixed={isFixed}>
        <Content>
          { children }
          <BottomBar {...bottomBarProps}/>
        </Content>
        <NoteModal isOpen={isNoteModalOpen} content={noteModalContent}/>
      </ScrollWrapper>
    )
  }
}

export default WatchScrollContent
