/** 
 * Note system: detect notes on scroll & show them in bottom bar.
 */ 
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import BottomBar from './BottomBar'
import NoteModal from '../NoteModal'

import { sleep } from '../../utils'

const ScrollWrapper = styled.div``
const Content = styled.div``

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
    console.log('closeNoteModal !')
    this.setState({ isNoteModalOpen: false })
  }
  
  addElement(text, children, collection, numbering){
    const elements = this.state[collection] = this.state[collection] || {}
    let id = Object.keys(elements).length + 1
    console.log(`WatchScrollContent[${collection}]- numbering`, numbering)

    if(!numbering){
      id = String.fromCharCode(96 + id)
    }
    const element = { text, children, id, visible: false }
    elements[id] = element
    return element
  }
  
  showElement(key, collection){
    const elements = this.state[collection]
    const element = elements[key]
    element.visible = true
    this.setState({ [collection]: elements })
  }

  hideElement(key, collection){
    const elements = this.state[collection]
    const element = elements[key]
    element.visible = false
    this.setState({ [collection]: elements })
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
   
    const bottomBarProps = {
      notes: this.collection('notes'),
      refs: this.collection('refs'),
      visibleRefs: this.visibleCollection('refs'),
      visibleNotes: this.visibleCollection('notes'),
    }

    return (
      <ScrollWrapper>
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
