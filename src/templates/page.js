import React from 'react'
import styled from 'styled-components'
import HAST from '../components/renderHAST'
import Note from '../components/Note'
import Ref from '../components/Ref'

// wrapper to register notes
import ContentBottomBarWrapper from '../components/ContentBottomBarWrapper' 

const Strong = styled.span`
  font-weight: bold
`

const componentsMap = {
  strong: Strong,
  note: Note,
  ref: Ref,
}

const Holder = styled.div``;
const DefaultTemplate = ({ data }) => {
  const { hast } = data.markdownRemark
  const props = { hast, componentsMap }
  return (
    <Holder>
      <ContentBottomBarWrapper>
        <HAST {...props} />
      </ContentBottomBarWrapper>
    </Holder>
  )
}

export const query = graphql`
  query PageQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      hast {
        children {
          type
          tagName
          properties
          value
          children {
            type
            tagName
            properties
            value
          }
        }
      }
      internal {
        content
      }
      frontmatter {
        title
      }
    }
  }
`

export default DefaultTemplate
