import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout";
import Img from "gatsby-image/withIEPolyfill";
import SEO from "../../components/seo/index";
import "./styles/index.scss";

export const AboutUsPageTemplate = ({
  section_1_content,
  section_1_title,
  section_2_text,
  section_3_text,
  section_3_title,
  section_1_image,
  section_2_image
}) => {
  return (
    <>
      <SEO title={section_1_title} description={section_1_content} />
      <main id="main">
        <div className="page-about-us">
          <div className="container">
            <h1 className="h2 striped uppercase">{section_1_title}</h1>
            <div dangerouslySetInnerHTML={{ __html: section_1_content }} />
            <div className="main-visual">
              {!!section_1_image.childImageSharp ? (
                <Img
                  className="img-block"
                  fluid={section_1_image.childImageSharp.fluid}
                  objectFit="cover"
                  objectPosition="50% 50%"
                  alt="About Us"
                />
              ) : (
                <img src={section_1_image} alt="" />
              )}
            </div>
          </div>
          <div className="section-blue ">
            <div className="container-sm">
              {!!section_2_image.childImageSharp ? (
                <Img
                  className="visual img-rounded"
                  fixed={section_2_image.childImageSharp.fixed}
                  alt="About Us"
                />
              ) : (
                <img src={section_2_image} alt="" />
              )}
              <div className="content">
                <p>{section_2_text}</p>
              </div>
              <div className="circle circle-1" />
              <div className="circle circle-2" />
            </div>
          </div>
          <div className="container-sm ">
            <div className="content">
              <h2>{section_3_title}</h2>
              <p>{section_3_text}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

const AboutUsPage = ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <Layout>
      <AboutUsPageTemplate
        section_1_title={post.frontmatter.section_1_title}
        section_1_content={post.frontmatter.section_1_content}
        section_2_text={post.frontmatter.section_2_text}
        section_3_title={post.frontmatter.section_3_title}
        section_3_text={post.frontmatter.section_3_text}
        section_1_image={post.frontmatter.section_1_image}
        section_2_image={post.frontmatter.section_2_image}
      />
    </Layout>
  );
};

export default AboutUsPage;

export const aboutUsPageQuery = graphql`
  query AboutUsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        section_1_content
        section_1_title
        section_1_image {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        section_2_text
        section_2_image {
          childImageSharp {
            fixed(quality: 90, width: 240, height: 240) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        section_3_text
        section_3_title
      }
    }
  }
`;
