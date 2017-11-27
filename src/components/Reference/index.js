import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Reference extends Component {
  static propTypes = {
    content: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node)
    ])
  }

  openReference(){
    this.$portal.show()  
  }

  closeReference(){
    this.$portal.hide()
  }
  
  bindReference($ref){
    this.$ref = $ref
  }

  render(){
    const { children } = this.props
    return (
      <span onClick={this.openReference} onRef={ r => this.bindNote(r) }>
        { children }
      </span>
    )
  }
}

export default Reference
