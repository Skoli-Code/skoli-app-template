const parse = require('remark-parse')
const customParser = require('@dumpster/remark-custom-element-to-hast')
const GraphQLJSON = require('graphql-type-json')
const unified = require('unified')
const frontmatter = require('remark-frontmatter')

module.exports = ({
  getNode,
  cache,
  pathPrefix,
  type 
} , options) => {
  // we only extend nodes created by gatsby-transformer-remark
  if (type.name !== `MarkdownRemark`) { return {} }
  function parseElements(node){
    const hast = unified()
        .use(parse)
        .use(frontmatter, ['yaml'])
        .use(customParser, {
          componentWhitelist: options.components 
        })
        .processSync(node.internal.content).contents

    if(options.debug){
      console.log(JSON.stringify(hast, null, 2))
    }
    return hast
  }

  return {
    hast: {
      type: GraphQLJSON,
      resolve(node){
        return parseElements(node)
      }
    }
  }
}
