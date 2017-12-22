import React from 'react'
import PageTemplate from './page'
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
  const {
    hast,
    frontmatter: {
      title,
      description,
      keywords,
      image
    }
  } = data.markdownRemark
  const props = { hast, componentsMap }
  const meta = {
    title, description, keywords, image
  }
  console.log('markdown-page', meta)
  return (
    <PageTemplate meta={ meta }>
      <HAST {...props} />
    </PageTemplate>
  )
}

export const query = graphql`
  query PageQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      hast 
      internal {
        content
      }
      frontmatter {
        title
        description
        image
        keywords
      }
    }
  }
`

export default Template
