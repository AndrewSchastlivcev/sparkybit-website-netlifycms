const urlJoin = require("url-join");
const config = require("./src/config/website");

//dot ENV config // working with .env package  
let activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

require("dotenv").config({
  path: `.env.${activeEnv}`
});
console.log('\x1b[33m%s\x1b[0m', `>>> Using environment config: '${activeEnv}'`);
console.log('\x1b[36m%s\x1b[0m', `*** Site URL: ${process.env.GATSBY_SITE_URL}`);

module.exports = {
  pathPrefix: config.pathPrefix === "" ? "/" : config.pathPrefix,
  siteMetadata: {
    siteUrl: urlJoin(config.siteUrl, config.pathPrefix),
    title: config.siteTitle,
    description: config.siteDescription,
    author: config.author,
    siteLogo: config.siteLogo
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-recaptcha`
    },
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-purgecss", // purges all unused/unreferenced css rules
      options: {
        develop: true, // Activates purging in npm run develop
        purgeOnly: ["styles/", "templates/"], // applies purging only on the bulma css file
        ignore: ["templates/contacts-page"]
      }
    }, // must be after other CSS plugins
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        start_url: ".",
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: `minimal-ui`,
        icon: `src/img/logo/logo-circle.png` // This path is relative to the root of the site.
      }
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-robots-txt",
    "gatsby-plugin-remove-trailing-slashes",
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Montserrat`,
            variants: [`400`, `600`, `700`, `800`]
          }
        ]
      }
    },
    {
      resolve: "gatsby-plugin-polyfill-io",
      options: {
        features: [`Array.from`, `fetch`]
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // replace "UA-XXXXXXXXX-X" with your own Tracking ID
        //trackingId: config.googleAnalyticsID
        trackingId: process.env.GATSBY_GA_ID
      }
    },
    "gatsby-plugin-remove-generator",
    {
      resolve: "gatsby-plugin-react-leaflet",
      options: {
        linkStyles: true // (default: true) Enable/disable loading stylesheets via CDN
      }
    },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img`,
        name: "uploads"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/img`,
        name: "images"
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-relative-images",
            options: {
              name: "uploads"
            }
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048
            }
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "static"
            }
          }
        ]
      }
    },
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
        enableIdentityWidget: true,
        htmlFavicon: `${__dirname}/src/img/favicon-16x16.png`
        }
    },
    "gatsby-plugin-netlify" // make sure to keep it last in the array
  ]
};
