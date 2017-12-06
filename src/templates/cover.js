import React from 'react'
import styled from 'styled-components'
import { size } from 'styled-theme'

const Holder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
`

const Centered = styled.div`
  margin: auto;
  max-width: ${size('containerMaxWidth')};
`

const CoverTemplate = ({ children }) => (
  <Holder>
    <Centered>
      { children }
    </Centered>
  </Holder>
)

export default CoverTemplate
