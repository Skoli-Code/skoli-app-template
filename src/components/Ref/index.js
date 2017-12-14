import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Waypoint from 'react-waypoint'
import styled from 'styled-components'
import Link from '../Link'
import { hash } from '../../utils' 
import watchScroll from '../WatchScrollContent/watchScroll'

const Holder = styled.span`
  cursor: pointer;
`

class Ref extends Component {
  render(){
    const { inBottomBar, text, children, id } = this.props
    const hash = `ref-${id}`
    const linkProps = {
      to: `#${hash}`
    }

    if(!inBottomBar){
      linkProps.id = hash
    }

    return (
      <Holder>
        { inBottomBar && (<span>{ id }.&nbsp;</span>)}
        <Link {...linkProps}>
          { children }
          { !inBottomBar && (
            <sup>{ id }</sup>
          )}
        </Link>
      </Holder>
    )
    
  }
}

export default watchScroll(Ref, { collection: 'refs' })
