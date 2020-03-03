const config = {
  siteTitle: "Sparkybit", // Site title.
  siteTitleShort: "Sparkybit", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "Sparkybit", // Alternative site title for SEO.
  organization: "Sparkybit", // Organization name for schema.org SEO
  author: "Sparkybit Team", // Username to display in the author segment.
  siteLogo: "../img/favicon-96x96.png", // Logo used for SEO and manifest.
  siteUrl: "https://sparkybit.com", // Domain of your website without pathPrefix.
  pathPrefix: "/", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  blogPrefix: "/blog", // Blog path prefix
  ampPrefix: "/amp/",
  vacancyPrefix: "/careers",
  siteDescription:
    "Sparkybit is a leading Ukraine software development company, with a focus on fintech, open banking, banking technology, and SME IT planning.", // Website description used for RSS feeds/meta description tag.
  // siteRss: "/rss.xml", // Path to the RSS file.
  // siteFBAppID: "1825356251115265", // FB Application ID for using app insights
  googleAnalyticsID: "UA-68823502-1", // GA tracking ID.
  // disqusShortname: "https-vagr9k-github-io-gatsby-advanced-starter", // Disqus shortname.
  // postDefaultCategoryID: "Tech", // Default category for posts.
  // dateFromFormat: "YYYY-MM-DD", // Date format used in the frontmatter.
  // dateFormat: "DD/MM/YYYY", // Date format for display.
  themeColor: "#271b55", // Used for setting manifest and progress theme colors.
  backgroundColor: "#ffffff" // Used for setting manifest background color.
};

// Validate

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === "/") {
  config.pathPrefix = "";
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, "")}`;
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === "/")
  config.siteUrl = config.siteUrl.slice(0, -1);

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== "/")
  config.siteRss = `/${config.siteRss}`;

module.exports = config;
