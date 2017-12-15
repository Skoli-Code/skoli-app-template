import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Waypoint from 'react-waypoint'
import styled from 'styled-components'
import Link from '../Link'
import Bold from '../Bold'
import { hash } from '../../utils' 
import watchScroll from '../WatchScrollContent/watchScroll'

const Holder = styled.span``

const Span = styled.span`
  font-style: italic
`

class Ref extends Component {
  render(){
    const { inBottomBar, text, children, id } = this.props
    const props = inBottomBar ? {} : { id: `ref-${id}` }

    return (
      // this innerRef settings is here to make <Waypoint> works 
      // in components/WatchScrollContent/watchScroll.
      // See https://github.com/brigade/react-waypoint#children
      <Holder innerRef={this.props.innerRef}>
        { inBottomBar && (<Bold>{ id }.&nbsp;</Bold>)}
        <Span {...props}>
          { children }
          { !inBottomBar && (
            <sup>{ id }</sup>
          )}
        </Span>
        { inBottomBar && (<span>,&nbsp;{ text }</span>) }
      </Holder>
    )
  }
}

export default watchScroll(Ref, { collection: 'refs' })
