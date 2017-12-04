/** 
 * Note system: detect notes on scroll & show them in bottom bar.
 */ 
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import BottomBar from '../BottomBar'


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
      visibleNotes: {},
      visibleRefs: {}
    }
  }

  addNote(key, content){
    const { visibleNotes } = this.state
    visibleNotes[key] = content
    this.setState({ visibleNotes })
  }
  
  removeNote(key){
    const { visibleNotes } = this.state
    if(visibleNotes[key]){
      delete visibleNotes[key]
    }
    this.setState({ visibleNotes })
  }

  componentDidMount(){
  }
  
  visibleNotes(){
    const { visibleNotes } = this.state
    return Object.keys(visibleNotes).map(key => ({ key, content: visibleNotes[key] }))
  }

  visibleRefs(){
    const { visibleRefs } = this.state
    return Object.keys(visibleRefs).map(key => ({ key, content: visibleRefs[key] }))
  }

  render(){
    const { children } = this.props
    const refs = this.visibleRefs()
    const notes = this.visibleNotes()
    const bottomBarProps = { refs, notes }
    return (
      <ScrollWrapper>
        <Content>
          { children }
        </Content>

        <BottomBar {...bottomBarProps}/>
      </ScrollWrapper>
    )
  }
}

export default WatchScrollContent
