import React from 'react'
import styled from 'styled-components'

const Holder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`
const CoverTemplate = ({ children }) => (
  <Holder>
    { children }
  </Holder>
)

export default CoverTemplate
