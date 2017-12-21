import React from 'react'
import styled from 'styled-components'
import { prop } from 'styled-tools'
import { key, size } from 'styled-theme'

const Holder = styled.div`
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
`

const CoverImage = styled.div`
  background-size: cover;
  z-index: 1;
  position: absolute;
  top:    -${props => key('coverBlur')(props)+10}px;
  left:   -${props => key('coverBlur')(props)+10}px;
  right:  -${props => key('coverBlur')(props)+10}px;
  bottom: -${props => key('coverBlur')(props)+10}px;
  filter: blur(${key('coverBlur', 0)}px);
`

const Centered = styled.div`
  margin: auto;
  max-width: ${size('containerMaxWidth')};
  position: relative;
  padding: 15px;
  padding-bottom: 60px;
  color: white;
  z-index: 2;
`

const CoverTemplate = ({ children, background, blur=5}) => (
  <Holder>
    <CoverImage blur={blur} style={{backgroundImage: `url(${background})`}} />
    <Centered>
      { children }
    </Centered>
  </Holder>
)

export default CoverTemplate
