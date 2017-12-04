import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import GatsbyLink from 'gatsby-link'

const Link = styled(
  ({ to, href, children, ...otherProps }) => {
    let $link
    if(href){
      to = href
    }
    if(to.startsWith('http')){
      $link = <a href={to} target="_blank" {...otherProps}>{ children }</a>
    } else {
      $link = <GatsbyLink to={to} {...otherProps}>{ children }</GatsbyLink>
    }
    return $link
  }
)`
  text-decoration: none;
`

export default Link
