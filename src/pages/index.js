import React from 'react'
import styled from 'styled-components'

import Button from '../components/Button'
import Cover from '../templates/cover'

const CoverTitle = styled.h1`
  font-size: 64px
`
const IndexPage = () => (
  <Cover>
    <CoverTitle>
      Skoli application template
    </CoverTitle>
    <p>
      This is an example
    </p>
    <Button to="/introduction">GO</Button> 
  </Cover>
)

export default IndexPage
