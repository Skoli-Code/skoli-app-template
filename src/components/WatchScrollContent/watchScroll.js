import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Waypoint from 'react-waypoint'

const watchElement = (Wrapped, {
  numbering = true,
  collection,
}) => {
  return class extends Component {
    static contextTypes = {
      scrollWatcher: PropTypes.object,
    }

    static defaultProps = {
      inBottomBar: false
    }

    watcher(){
      return this.context.scrollWatcher
    }

    onEnter(){
      this.watcher().showElement(
        this.id, collection
      )
    }
    
    onLeave(){
      this.watcher().hideElement(
        this.id, collection
      )
    }
    render(){
      const { text, children, inBottomBar } = this.props
      const { id } = this.watcher().addElement(
        text, children, collection
      )
      const watcher = this.watcher()
      this.id = id
      const element = (
        <Wrapped
          watcher={watcher}
          id={id}
          inBottomBar={inBottomBar}
          text={text}
          children={children}
        />
      )
      if (inBottomBar) {
        return element
      } else {
        return (
          <Waypoint 
            onEnter={() => this.onEnter()}
            onLeave={() => this.onLeave()}
            topOffset={-10}
            bottomOffset={-20}
          >
            { element }
          </Waypoint>
        )
      }
    }
  }
}

export default watchElement
