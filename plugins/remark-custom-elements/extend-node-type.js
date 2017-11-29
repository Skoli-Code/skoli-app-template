const parse = require('remark-parse')
const customParser = require('@dumpster/remark-custom-element-to-hast')
const GraphQLJSON = require('graphql-type-json')
const unified = require('unified')

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLEnumType,
} = require(`graphql`)

const getPropTypes = ({ components }) => new GraphQLObjectType({
  name: `properties`,
  fields: (components => {
    const _f = {}
    components.forEach(({ properties }) => {
      properties.forEach(props => (
        Object.keys(props).forEach(key => {
          _f[key] = { type: props[key] }
        })
      ))
    })
    return _f
  })(components)
})


const MarkdownAstObject = ({ PropTypes, depth = 0}) => {
  const conf =  {
    name: `ast_${depth}`,
    fields: {
      type: { type: GraphQLString },
      value: { type: GraphQLString },
      tagName: { type: GraphQLString },
      properties: { type: GraphQLJSON },
    }
  }
  if(depth < 1) {
    conf.fields.children = {
      type: new GraphQLList(MarkdownAstObject({
        PropTypes, depth: depth+1 
      }))
    }
  } else {
    conf.fields.children = {
      type: new GraphQLList(new GraphQLObjectType({
        name: `ast_${depth}_child`,
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
  if (type.name !== `MarkdownRemark`) { return {} }
  console.log(
    'remark-custom-elements/extend-node-type', 'In promise !'
  )
  function parseElements(node){
    const ast = unified()
        .use(parse)
        .use(customParser, {
          whitelist: options.components.map(({ name }) => name) 
        })
        .processSync(node.internal.content).contents

    console.log('parseElements AST = ', ast)
    return ast 
  }
  const PropTypes = getPropTypes(options)
  const MarkdownObject = MarkdownAstObject({ PropTypes })
  const RootType = new GraphQLObjectType({
    name: `ast`,
    fields: {
      type: { type: GraphQLString },
      children: {
        type: new GraphQLList(MarkdownObject)
      }
    }
  })

  return {
    ast: {
      type: RootType,
      resolve(node){
        console.log(
          'remark-custom-elements/extend-node-type/astRoot/resolve'
        )
        return parseElements(node)
      }
    }
  }
}
