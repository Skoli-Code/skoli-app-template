exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators
  let slug
  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)
    const splittedDir = parsedFilePath.dir.split('/')
    // remove /backend /frontend /graphql
    if (splittedDir.length === 2) {
      slug = `/${splittedDir[1]}/${parsedFilePath.name}/`
    } else if (parsedFilePath.name !== `index` && parsedFilePath.dir !== ``) {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`
    } else if (parsedFilePath.dir === ``) {
      slug = `/${parsedFilePath.name}/`
    } else {
      slug = `/${parsedFilePath.dir}/`
    }

    // Add slug as a field on the node.
    createNodeField({ node, fieldName: `slug`, fieldValue: slug })
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const pages = []
    // Query for all markdown "nodes" and for the slug we previously created.
    resolve(
      graphql(
        `{
          allMarkdownRemark {
            edges {
              node {
                frontmatter {
                  title
                  layout
                }
                fields {
                  slug
                }
                excerpt(pruneLength: 1000)
              }
            }
          }
        }
      `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        result.data.allMarkdownRemark.edges.forEach(edge => {
          const layoutName = edge.node.frontmatter.layout || 'index'
          createPage({
            path: edge.node.fields.slug, // required
            component: layout,
            context: {
              slug: edge.node.fields.slug,
            },
          })
        })

        if (process.env.NODE_ENV === 'production') {
          try {
            syncToAlgolia(result.data)
          } catch (e) {
            console.log('Warning: Algolia Error')
          }
        }

        return
      })
    )
  })
}
