import React from 'react'
import styled from 'styled-components'
import { prop } from 'styled-tools'
import { size } from 'styled-theme'

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

const CoverImage = styled.div.attrs({
  posOffset: ({ blur }) => blur + 5
})`
  background-size: cover;
  z-index: 1;
  position: absolute;
  top:    -${prop('posOffset', 0)}px;
  left:   -${prop('posOffset', 0)}px;
  right:  -${prop('posOffset', 0)}px;
  bottom: -${prop('posOffset', 0)}px;
  filter: blur(${prop('blur', 0)}px);
`

const Centered = styled.div`
  margin: auto;
  max-width: ${size('containerMaxWidth')};
  position: relative;
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
