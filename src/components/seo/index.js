/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import { Location } from "@reach/router";
import urlJoin from "url-join";

import config from "../../config/website";

import {
  getGeneralPageSchema,
  getArticlePageSchema
} from "../../utils/json-ld";

function generateJsonLdSchemaContent({ title, url, image, pageMeta }) {
  let jsonLdSchemaContent;

  if (pageMeta) {
    jsonLdSchemaContent = getArticlePageSchema({ title, url, image, pageMeta });
  }

  if (!jsonLdSchemaContent) {
    jsonLdSchemaContent = getGeneralPageSchema({ title, url, image });
  }

  return JSON.stringify(jsonLdSchemaContent);
}

function SEO({ description, lang, meta, keywords, title, pageMeta }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  let image = urlJoin(config.siteUrl, config.pathPrefix, config.siteLogo);

  if (pageMeta && pageMeta.featured_media) {
    image = urlJoin(
      config.siteUrl,
      config.pathPrefix,
      pageMeta.featured_media.localFile.publicURL
    );
  }

  return (
    <Location>
      {({ location }) => {
        const pageUrl = urlJoin(
          config.siteUrl,
          config.pathPrefix,
          location.pathname
        );
        return (
          <Helmet
            htmlAttributes={{
              lang: "en"
            }}
            title={title}
            titleTemplate={`%s | ${site.siteMetadata.title}`}
            meta={[
              /* General tags */
              { name: `description`, content: metaDescription },
              // { name: `image`, content: image },
              /* OpenGraph tags */
              { property: `og:url`, content: pageUrl },
              { property: `og:title`, content: title },
              { property: `og:description`, content: metaDescription },
              // { property: `og:image`, content: image },
              { property: `og:type`, content: `website` }
              /* Twitter Card tags */
              // { name: `twitter:card`, content: `summary_large_image` },
              // { name: `twitter:creator`, content: site.siteMetadata.author },
              // { name: `twitter:title`, content: title },
              // { name: `twitter:description`, content: metaDescription },
              // { name: `twitter:image`, content: image }
            ]
              .concat(
                pageMeta ? { property: `og:type`, content: `article` } : []
              )
              .concat(
                keywords.length > 0
                  ? { name: `keywords`, content: keywords.join(`, `) }
                  : []
              )
              .concat(meta)}
          >
            <link rel="canonical" href={pageUrl} /> {/* ⚡ Add canonical */}
            {/* Schema.org tags */}
            <script type="application/ld+json">
              {generateJsonLdSchemaContent({
                title,
                url: pageUrl,
                image,
                pageMeta
              })}
            </script>
          </Helmet>
        );
      }}
    </Location>
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: []
};

export default SEO;
