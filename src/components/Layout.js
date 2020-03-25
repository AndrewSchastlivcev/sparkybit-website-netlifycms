import React from "react";
import { Helmet } from "react-helmet";

import Header from "../components/header/";
import Footer from "../components/footer/";
import useSiteMetadata from "./SiteMetadata";

import "../styles/index.scss";
const URL = process.env.GATSBY_SITE_URL || 'https://sparkybit.com/'

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <div id="wrapper">
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="msapplication-config" content="/static/browserconfig.xml" />
        <link rel="canonical" href={URL} />
      </Helmet>

      <div className="w1">
        <div className="w2">
          <Header />
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default TemplateWrapper;
