import React, { Component } from 'react'
import CloseIcon from '../../icons/xmark' 

class NoteModal extends Component {
  render(){
    return (
      <Holder>
        <TopRight>
        <CloseIcon onClick={() => this.close()}/>
        </TopRight>
        <Content>
          { children } 
        </Content>
      </Holder>
    )
  }
}

export default NoteModal
