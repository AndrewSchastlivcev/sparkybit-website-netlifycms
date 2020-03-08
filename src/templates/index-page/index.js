import React, { Component } from "react";
import { Link, graphql } from "gatsby";
import Layout from "../../components/Layout";
import Img from "gatsby-image/withIEPolyfill";
import Content, { HTMLContent } from "../../components/Content";
import ModalContact from "../../components/modal-contact";
import Picture from "../../components/react-picturefill";

import SEO from "../../components/seo/index";

import "./styles/index.scss";

export class IndexPageTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = { isModalOpen: false };
    this.setModalState = this._setModalState.bind(this);
    this.handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  _setModalState = state => {
    if (this.state.isModalOpen !== state) {
      return this.setState({ isModalOpen: state });
    }
  };

  _handleFormSubmit() {
    this.setModalState(false);
  }

  render() {
    const {
      section_1_image,
      section_1_title,
      section_1_btn_text,
      section_1_subheading,
      contentComponent,
      content,
      section_2_right_subheading,
      section_2_right_text,
      section_2_left_subheading,
      section_2_left_text,
      section_2_title,
      section_2_1_image,
      section_2_2_image,
      section_3_title,
      section_3_text,
      section_3_image_mobile,
      section_3_image_desktop
    } = this.props;
    const { isModalOpen } = this.state;
    const { setModalState, handleFormSubmit } = this;
    const MainPageContent = contentComponent || Content;
   
    return (
      <>
        <SEO title="Home" description={content} />
        <main id="main">
          <div className="page-main">
            <section className="container">
              <div className="section-greeter">
                <div className="content">
                  <h1 className="heading uppercase">{section_1_title}</h1>
                  <h4 className="heading">{section_1_subheading}</h4>
                  <MainPageContent
                    className="description-wrap"
                    content={content}
                  />
                  <div>
                    <button
                      className="btn btn-primary trigger"
                      onClick={() => this.setModalState(true)}
                    >
                      {section_1_btn_text}
                    </button>
                  </div>
                </div>
                <div className="circle circle-1" />
                <div className="circle circle-3" />
                {!!section_1_image.childImageSharp ? (
                  <Img
                    className="main_background"
                    fluid={section_1_image.childImageSharp.fluid}
                    objectFit="cover"
                    objectPosition="50% 50%"
                    alt="Greetings from Sparkybit team"
                  />
                ) : (
                  <img
                    src={section_1_image}
                    alt=""
                    className="main_background"
                  />
                )}

                <div className="circle circle-7" />
              </div>
            </section>
            <section className="section-services">
              <div className="container">
                <h1 className="striped uppercase">{section_2_title}</h1>
                <div className="services">
                  <div className="service salesforce">
                    <div className="circle circle-1">
                      {!!section_2_1_image.childImageSharp ? (
                        <Img
                          fixed={section_2_1_image.childImageSharp.fixed}
                          alt={section_2_right_subheading}
                          fadeIn={true}
                        />
                      ) : (
                        <img
                          src={section_2_1_image}
                          alt={section_2_right_subheading}
                        />
                      )}
                    </div>
                    <div className="circle circle-2" />
                    <div className="content pull-right">
                      <h5 className="heading uppercase">
                        {section_2_right_subheading}
                      </h5>
                      <p>{section_2_right_text}</p>
                      <div className="more-holder">
                        <Link to="/services" className="link-more pull-right">
                          Learn services
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="service bespoke">
                    <div className="circle circle-1">
                      {!!section_2_2_image.childImageSharp ? (
                        <Img
                          fixed={section_2_2_image.childImageSharp.fixed}
                          alt={section_2_left_subheading}
                          fadeIn={false}
                        />
                      ) : (
                        <img
                          src={section_2_2_image}
                          alt={section_2_left_subheading}
                        />
                      )}
                    </div>
                    <div className="content pull-left">
                      <h5 className="heading uppercase">
                        {section_2_left_subheading}
                      </h5>
                      <p>{section_2_left_text}</p>
                      <div className="more-holder">
                        <Link
                          to="/services#bespoke"
                          className="link-more pull-right"
                        >
                          Learn bespoke
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="container">
              <div className="section-technologies">
                <h1 className="striped uppercase">{section_3_title}</h1>
                <p>{section_3_text}</p>
                <div className="technologies">
                  {/* {!!section_3_image_desktop.childImageSharp ? (
                    <Img
                      fluid={section_3_image_desktop.childImageSharp.fluid}
                      alt={section_3_title}
                      fadeIn={true}
                    />
                  ) : (
                    <img src={section_3_image_desktop} alt={section_3_title} />
                  )} */}
                  <Picture
                      sources={[
                        {
                          type: "image/webp",
                          srcSet:
                            section_3_image_mobile
                              .childImageSharp.fixed.srcSetWebp,
                          media: "(max-width: 767px)",
                        },
                        {
                          srcSet:
                            section_3_image_mobile
                              .childImageSharp.fixed.srcSet,
                          media: "(max-width: 767px)",
                        },
                        {
                          type: "image/webp",
                          srcSet:
                            section_3_image_desktop
                              .childImageSharp.fluid.srcSetWebp,
                        },
                        {
                          srcSet:
                            section_3_image_desktop
                              .childImageSharp.fluid.srcSet,
                        },
                      ]}
                      src={
                        section_3_image_desktop.childImageSharp
                          .fluid.src
                      }
                    />
                </div>
              </div>
            </section>
          </div>
          <ModalContact
            isModalOpen={isModalOpen}
            setModalState={setModalState}
            handleFormSubmit={handleFormSubmit}
          />
        </main>
      </>
    );
  }
}

const IndexPage = ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <Layout>
      <IndexPageTemplate
        contentComponent={HTMLContent}
        content={post.html}
        section_1_image={post.frontmatter.section_1_image}
        section_1_title={post.frontmatter.section_1_title}
        section_1_btn_text={post.frontmatter.section_1_btn_text}
        section_1_subheading={post.frontmatter.section_1_subheading}
        section_2_right_subheading={post.frontmatter.section_2_right_subheading}
        section_2_right_text={post.frontmatter.section_2_right_text}
        section_2_left_subheading={post.frontmatter.section_2_left_subheading}
        section_2_left_text={post.frontmatter.section_2_left_text}
        section_2_title={post.frontmatter.section_2_title}
        section_2_1_image={post.frontmatter.section_2_1_image}
        section_2_2_image={post.frontmatter.section_2_2_image}
        section_3_title={post.frontmatter.section_3_title}
        section_3_text={post.frontmatter.section_3_text}
        section_3_image_desktop={post.frontmatter.section_3_image_desktop}
        section_3_image_mobile={post.frontmatter.section_3_image_mobile}
      />
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      html
      frontmatter {
        section_1_title
        section_1_image {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1280) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
        section_1_btn_text
        section_1_subheading
        section_2_1_image {
          childImageSharp {
            fixed(quality: 90, width: 300, height: 300) {
              ...GatsbyImageSharpFixed_tracedSVG
            }
          }
        }
        section_2_2_image {
          childImageSharp {
            fixed(quality: 90, width: 465, height: 465) {
              ...GatsbyImageSharpFixed_tracedSVG
            }
          }
        }
        section_2_right_subheading
        section_2_right_text
        section_2_left_subheading
        section_2_left_text
        section_2_title
        section_3_title
        section_3_text
        section_3_image_desktop {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        section_3_image_mobile {
          childImageSharp {
            fixed(quality: 60, width: 395, height: 1361) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`;
