import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Waypoint from 'react-waypoint'
import canUseDom from 'can-use-dom'

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
      let id
      const watcher = this.watcher()
      const { inBottomBar, ...otherProps } = this.props
      const { topOffset, bottomOffset } = watcher.props

      if(inBottomBar){
        id = this.props.id
      } else {
        const element = watcher.addElement({
          collection, numbering, ...otherProps
        })
        id = element.id
      }
      this.id = id
      const props = {
        ...otherProps,
        ...element,
        inBottomBar,
        id,
      }
      const element = <Wrapped watcher={watcher} {...props} />
      const ancestor = canUseDom ? window : null
      if (inBottomBar) {
        return element
      } else {
        return (
          <Waypoint 
            scrollableAncestor={ancestor}
            onEnter={() => this.onEnter()}
            onLeave={() => this.onLeave()}
            topOffset={topOffset}
            bottomOffset={bottomOffset}
          >
            { element }
          </Waypoint>
        )
      }
    }
  }
}

export default watchElement
