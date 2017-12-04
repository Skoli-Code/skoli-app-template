import React from 'react'
import styled from 'styled-components'
import HAST from '../components/renderHAST'
import Note from '../components/Note'
import Ref from '../components/Ref'

// wrapper to register notes
import WatchScrollContent from '../components/WatchScrollContent' 

const componentsMap = {
  Note,
  Ref,
}

const Holder = styled.div``;
const DefaultTemplate = ({ data }) => {
  const { hast } = data.markdownRemark
  const props = { hast, componentsMap }
  return (
    <Holder>
      <WatchScrollContent>
        <HAST {...props} />
      </WatchScrollContent>
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
            children {
              type
              tagName
              properties
              value
              children {
                type
                value
              }
            }
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
