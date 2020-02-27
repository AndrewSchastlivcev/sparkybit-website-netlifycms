import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout";
import Content, { HTMLContent } from "../../components/Content";
import Img from "gatsby-image/withIEPolyfill";
import SEO from "../../components/seo/index";

import "./styles/index.scss";

export const ServicesPageTemplate = ({
  heading,
  content,
  contentComponent,
  subheading,
  image
}) => {
  const ServicesContent = contentComponent || Content;

  const imageStyle = { borderRadius: "5px", width: "100%", height: "200px" };

  return (
    <>
      <SEO title={heading} description={subheading} />
      <main id="main">
        {!!image.childImageSharp ? (
          <Img
            className="service-background"
            fluid={image.childImageSharp.fluid}
            objectFit="contain"
            objectPosition="50% 50%"
            alt="Services"
          />
        ) : (
          <img src={image} alt="" style={imageStyle} />
        )}
        <div className="page-services">
          <div className="container">
            <h1 className="h2 striped">{heading}</h1>
            <h3>{subheading}</h3>
            <hr />
            <ServicesContent content={content} />
          </div>
          <div className="circle circle-1" />
          <div className="circle circle-2" />
          <div className="circle circle-3" />
        </div>
      </main>
    </>
  );
};

const ServicesPage = ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <Layout>
      <ServicesPageTemplate
        contentComponent={HTMLContent}
        content={post.html}
        heading={post.frontmatter.heading}
        subheading={post.frontmatter.subheading}
        image={post.frontmatter.image}
      />
    </Layout>
  );
};

export default ServicesPage;

export const servicesPageQuery = graphql`
  query ServicesPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        heading
        subheading
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
