import React from 'react'
import styled from 'styled-components'
import { size } from 'styled-theme'
// wrapper to register notes
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import WatchScrollContent from '../components/WatchScrollContent' 

const Holder = styled.div``;
const ContentHolder = styled.div`
  padding-top: ${size('navbarHeight')};
`;

const DefaultTemplate = ({ children }) => (
  <Holder>
    <Navbar />
    <ContentHolder>
      <Container>
        <WatchScrollContent>
          { children }
        </WatchScrollContent>
      </Container>
    </ContentHolder>
  </Holder>
)


export default DefaultTemplate
