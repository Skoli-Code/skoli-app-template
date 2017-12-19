import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { ifProp } from 'styled-tools'
import { palette } from 'styled-theme'
import CloseIcon from '../../icons/xmark' 
import Container from '../Container'

const Holder = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transform: translate(9999px, 0);
  transition: transform .33s ease-out;
  background: ${palette('white', 0)};
  ${ifProp('isOpen', css`
    transform: translate(0, 0);
  `)}
`
const TopRight = styled.div`
  position: absolute;
  z-index: 5;
  top: 1em;
  right: 1em;
  
  svg {
    cursor: pointer;
  }
`

const Content = styled.div`
  position: absolute;
  z-index: 4;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1em;
`

const modalRoot = document.getElementById('__modals')

const StringOrNode = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.node,
])

class NoteModal extends Component {
  static contextTypes = {
    scrollWatcher: PropTypes.object,
  }
  static propTypes = {
    isOpen: PropTypes.bool,
    content: PropTypes.oneOfType([
      StringOrNode,
      PropTypes.arrayOf(StringOrNode),
    ])
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
        <TopRight onClick={() => this.close()}>
          <CloseIcon />
        </TopRight>
        <Content>
          <Container>
            { content }
          </Container>
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
