const parse = require('remark-parse')
const customParser = require('@dumpster/remark-custom-element-to-hast')
const GraphQLJSON = require('graphql-type-json')
const unified = require('unified')
const frontmatter = require('remark-frontmatter')

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} = require(`graphql`)

// returns GraphQLObjectType of every markdown hast node
const MarkdownAstObject = ({ depth = 0}) => {
  const conf =  {
    name: `hast_${depth}`,
    fields: {
      type: { type: GraphQLString },
      value: { type: GraphQLString },
      tagName: { type: GraphQLString },
      properties: { type: GraphQLJSON },
    }
  }
  // depth limit to avoid infinite recursion
  if(depth < 4) {
    conf.fields.children = {
      type: new GraphQLList(MarkdownAstObject({
        depth: depth+1 
      }))
    }
  } else {
    conf.fields.children = {
      type: new GraphQLList(new GraphQLObjectType({
        name: `hast_${depth}_child`,
        fields: {
          type: { type: GraphQLString },
          value: { type: GraphQLString },
        }
      }))
    }
  }
  return new GraphQLObjectType(conf)
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
    const hast = unified()
        .use(parse)
        .use(frontmatter, ['yaml'])
        .use(customParser, {
          componentWhitelist: options.components 
        })
        .processSync(node.internal.content).contents

    console.log('hast', JSON.stringify(hast, null, 2))
    return hast
  }
  const MarkdownObject = MarkdownAstObject({})
  const RootType = new GraphQLObjectType({
    name: `hast`,
    fields: {
      type: { type: GraphQLString },
      children: {
        type: new GraphQLList(MarkdownObject)
      }
    }
  })

  return {
    hast: {
      type: RootType,
      resolve(node){
        return parseElements(node)
      }
    }
  }
}
