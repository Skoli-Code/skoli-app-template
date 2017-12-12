import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { ifProp } from 'styled-tools'
import CloseIcon from '../../icons/xmark' 
import { createPortal } from 'react-dom'
import { sleep } from '../../utils'

const Holder = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 200vh;
  right: -200vh;
  ${ifProp('isOpen', css`
    left:0;
    right: 0;
  `)}
`
const TopRight = styled.div`
  position: absolute;
  top: 1em;
  right: 1em;
`

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1em;
`

const modalRoot = document.getElementById('__modals')

class NoteModal extends Component {
  static contextTypes = {
    scrollWatcher: PropTypes.object,
  }
  
  constructor(props){
    super(props)
    this.el = document.createElement('div')
  }
  
  componentDidMount(){
    modalRoot.appendChild(this.el)
  }
  
  componentWillUnmount(){ 
    modalRoot.removeChild(this.el)
  }
  
  close(){
    this.context.scrollWatcher.closeNoteModal()
  }

  render(){
    const { isOpen, content } = this.props
    const modal = (
      <Holder isOpen={ isOpen }>
        <TopRight>
        <CloseIcon onClick={() => this.close()}/>
        </TopRight>
        <Content>
          { content }
        </Content>
      </Holder>
    )

    return createPortal(
      modal,
      this.el
    )
  }
}

export default NoteModal
