import urlJoin from "url-join";
import config from "../config/website";

const getDefaultpageSchemaOrgJSONLD = ({ url, title, alternateName = "" }) => [
  {
    "@context": "http://schema.org",
    "@type": "WebSite",
    url,
    name: title,
    alternateName
  }
];

export const getGeneralPageSchema = metadata => {
  const { title, url } = metadata;
  return getDefaultpageSchemaOrgJSONLD({ url, title });
};

export const getArticlePageSchema = metadata => {
  const { title, url, image, pageMeta } = metadata;
  const postTitle = title || pageMeta.title;
  const blogUrl = urlJoin(config.siteUrl, config.blogPrefix);
  const schemaOrgJSONLD = getDefaultpageSchemaOrgJSONLD({
    url: blogUrl,
    title: postTitle
  });
  const excerpt = pageMeta.excerpt.replace(/<(?:.|\n)*?>/gm, "");
  schemaOrgJSONLD.push(
    {
      "@context": "http://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@id": url,
            name: postTitle,
            image
          }
        }
      ]
    },
    {
      "@context": "http://schema.org",
      "@type": "BlogPosting",
      url: blogUrl,
      name: postTitle,
      alternateName: "",
      headline: postTitle,
      image: {
        "@type": "ImageObject",
        url: image
      },
      description: excerpt,
      author: config.author,
      datePublished: pageMeta.date_published,
      publisher: {
        "@type": "Organization",
        name: config.organization,
        logo: {
          "@type": "ImageObject",
          url: urlJoin(config.siteUrl, config.siteLogo)
        }
      }
    }
  );
  return schemaOrgJSONLD;
};
