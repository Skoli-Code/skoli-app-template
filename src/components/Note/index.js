import React, { Component } from 'react'
import PropTypes from 'prop-types'
import logger from "@phenomic/core/lib/logger"

class Note extends Component {
  static propTypes = {
    content: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node)
    ])
  }

  openNote(){
    this.$portal.show()  
  }

  closeNote(){
    this.$portal.hide()
  }
  
  bindNote($ref){
    this.$ref = $ref
  }

  render(){
    const { content } = this.props
    return (
      <span onClick={this.openNote} onRef={ r => this.bindNote(r) }>
        { content }
      </span>
    )
  }
}

export default Note
