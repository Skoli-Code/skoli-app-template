import React from 'react'
import styled from 'styled-components'

// wrapper to register notes
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import WatchScrollContent from '../components/WatchScrollContent' 

const Holder = styled.div``;

const DefaultTemplate = ({ children }) => (
  <Holder>
    <Navbar />
    <Container>
      <WatchScrollContent>
        { children }
      </WatchScrollContent>
    </Container>
  </Holder>
)


export default DefaultTemplate
