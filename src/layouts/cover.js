import React from 'react'
import styled from 'styled-components'

const Holder = styled.div``;
const CoverLayout = ({ children }) => (
  <Holder>
    { children }
  </Holder>
)

export default CoverLayout;
