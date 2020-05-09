module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/renderer/pages`,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-typescript`
  ]
}