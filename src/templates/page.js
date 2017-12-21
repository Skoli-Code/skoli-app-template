import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { size } from 'styled-theme'
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import WatchScrollContent from '../components/WatchScrollContent' 
import { media } from '../styled-utils' 

const Holder = styled.div``;
const ContentHolder = styled.div`
  padding-top: 100px;
`;

const DefaultTemplate = ({ meta, children }) => (
  <Holder>
    <Navbar />
    <ContentHolder>
      <Container>
        <WatchScrollContent topOffset={80} bottomOffset={80}>
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
