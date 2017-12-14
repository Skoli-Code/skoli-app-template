import React from 'react'
import styled from 'styled-components'
import { palette } from 'styled-theme'
import PropTypes from 'prop-types'
import GatsbyLink from 'gatsby-link'

const Link = styled(
  ({ to, href, children, home, ...props }) => {
    let $link
    if(href){
      to = href
    }
    props.to = to 
    if(props.to){
      if(props.to.startsWith('http')){
        $link = <a target="_blank" {...props}>{ children }</a>
      } else {
        $link = <GatsbyLink  {...props}>{ children }</GatsbyLink>
      }
    } else {
      $link = <a {...props}>{ children }</a>
    }

    return $link
  }
)`
  text-decoration: none;
  color: ${palette('primary', 1)};

  &:hover: {
    color: ${palette('primary', 0)};
  }
`

export default Link
