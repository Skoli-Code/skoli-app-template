const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLEnumType,
} = require(`graphql`)

const customComponentsPlugin = {
  resolve: `remark-custom-elements`,
  options: {
    components: [ 'Note', 'Ref', 'BarChart' ],
    debug: true
  }
}

module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    title: `Gatsby Default Starter`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'content',
        path: `${__dirname}/content/`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-copy-linked-files`]
      }
    },
    customComponentsPlugin,
  ],
}
