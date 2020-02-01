module.exports = {
  siteMetadata: {
    title: `Slava B.`,
    author: `Slava Bezgachev`,
    description: `Slava Bezgachev's personal blog. I occasionally write about tech, software and hardware. Slava Bezgachev is a web developer, focusing on all things Javascript.`,
    siteUrl: `https://bezgachev.com/`,
    social: {
      twitter: `slavabez`,
      github: "slavabez"
    }
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: "superscript",
                  extend: "javascript",
                  definition: {
                    superscript_types: /(SuperType)/
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/
                    }
                  }
                }
              ],
              prompt: {
                user: "root",
                host: "localhost",
                global: false
              }
            }
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "nofollow"
            }
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-69298477-1`
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Slava's Blog`,
        short_name: `Slava B.`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#323232`,
        display: `minimal-ui`,
        icon: `content/assets/profile_pic.jpg`
      }
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Montserrat`,
            variants: ["400"],
            subsets: [`latin`]
          },
          {
            family: `Open Sans`,
            variants: [`400`, `700`]
          }
        ]
      }
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`
  ]
};
