import React from 'react'
import styled from 'styled-components'

const Holder = styled.div``;
const DefaultTemplate = ({ data }) => {
  console.log('DefaultTemplate()', 'data', data)
  return (
    <Holder>
      
    
    </Holder>
  )
}

const ast = `
`
export const query = graphql`
  query PageQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      ast {
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
