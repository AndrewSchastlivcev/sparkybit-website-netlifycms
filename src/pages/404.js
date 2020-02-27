import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/seo/index";

import "../styles/404/index.scss";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div id="main">
      <div className="page-404">
        <div className="container">
          <h1 className="h2 heading striped uppercase">NOT FOUND</h1>
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
          <p className="background">404</p>
        </div>
      </div>
    </div>
  </Layout>
);

export default NotFoundPage;
