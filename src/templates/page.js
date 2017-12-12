import React from 'react'
import PropTypes from 'prop-types'
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

const DefaultTemplate = ({ meta, children }) => (
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

DefaultTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.array,
}

export default DefaultTemplate
