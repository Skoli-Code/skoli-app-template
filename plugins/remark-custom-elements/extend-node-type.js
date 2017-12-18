const parse = require('remark-parse')
const customParser = require('@dumpster/remark-custom-element-to-hast')
const GraphQLJSON = require('graphql-type-json')
const unified = require('unified')
const frontmatter = require('remark-frontmatter')


const removeHeader = (md) => {
  return md.replace(/^---[\n\s\w\W]*---\n/g, '')
}

module.exports = ({
  getNode,
  cache,
  pathPrefix,
  type 
} , options) => {
  // we only extend nodes created by gatsby-transformer-remark
  if (type.name !== `MarkdownRemark`) { return {} }
  function parseElements(node){
    let parsed
    const parser = unified()
        .use(parse)
        .use(customParser, {
          componentWhitelist: options.components 
        })
    try {
      parsed = parser.processSync(
          removeHeader(node.internal.content)
        ).contents
    } catch (e) {
      console.log('An error occured during parsing:', e)
    }
    if(options.debug){
      console.log(JSON.stringify(parsed, null, 2))
    }
    return parsed
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
