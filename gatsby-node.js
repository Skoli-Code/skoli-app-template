const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators
  if (
    [`MarkdownRemark`, `CustomMarkdownRemark `].indexOf(
      node.internal.type
    ) >= 0
  ) {
    if(node.internal.type === `CustomMarkdownRemark`){
      console.log('gatsby-node.onCreateNode', node)
    }
    const fileNode = getNode(node.parent)
    const slug = createFilePath({node, getNode, basePath: 'content' })
    // Add slug as a field on the node.
    createNodeField({ node, name: `slug`, value: slug })
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    const pages = []
    // Query for all markdown "nodes" and for the slug we previously created.
    graphql(
      `{
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                layout
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `
    ).then(result => {
      if (result.errors) {
        console.log("createPages: Error(s) occured while querying markdown files")
        result.errors.forEach(err => console.error(err))
        reject(result.errors)
        return
      }

      // Create blog posts pages.
      result.data.allMarkdownRemark.edges.forEach(edge => {
        const layoutName = edge.node.frontmatter.layout || 'index'
        const component = path.resolve(`${__dirname}/src/templates/markdown-page.js`)
        createPage({
          path: edge.node.fields.slug, // required
          component,
          layout: layoutName,
          context: {
            slug: edge.node.fields.slug,
          },
        })
      })
      resolve()
    })
  })
}


