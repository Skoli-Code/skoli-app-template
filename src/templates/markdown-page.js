import React from 'react'
import DefaultTemplate from './page'
import HAST from '../components/renderHAST'

import Note from '../components/Note'
import Ref from '../components/Ref'
import BarChart from '../components/BarChart'

const componentsMap = {
  Note,
  Ref,
  BarChart,
}

const Template = ({ data }) => {
  const { hast } = data.markdownRemark
  const props = { hast, componentsMap }
  return (
    <DefaultTemplate>
      <HAST {...props} />
    </DefaultTemplate>
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

export default Template
