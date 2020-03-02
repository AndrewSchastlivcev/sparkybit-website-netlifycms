import React, { Component } from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout";
import Content, { HTMLContent } from "../../components/Content";
import IconEnvelope from "../../../src/img/icon-message-white.svg";
import ModalContact from "../../components/modal-contact";
import SEO from "../../components/seo/index";
import "./styles/index.scss";

export class CareerPostTemplate extends Component {
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
    const { description, title, content, contentComponent } = this.props;
    const { isModalOpen } = this.state;
    const { setModalState, handleFormSubmit } = this;
    const CareersContent = contentComponent || Content;
    return (
      <>
        <SEO title={title} description={description} />
        <main id="main">
          <div className="post-vacancy">
            <div className="container ">
              <h1 className="h1 striped uppercase">{title}</h1>
              <p>{description}</p>
              <hr />
              <CareersContent content={content} />
              <div className="feedback">
                <button
                  className="heading btn btn-primary trigger"
                  onClick={() => this.setModalState(true)}
                >
                  <img
                    className="feedback-image"
                    src={IconEnvelope}
                    alt="contact email"
                  />
                  <span className="feedback-title">APPLY</span>
                </button>
              </div>
            </div>
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

const CareerPost = ({ data }) => {
  const { markdownRemark: career } = data;
  return (
    <Layout>
      <CareerPostTemplate
        description={career.frontmatter.description}
        title={career.frontmatter.title}
        contentComponent={HTMLContent}
        content={career.html}
      />
    </Layout>
  );
};

export default CareerPost;

export const pageQuery = graphql`
  query CareerPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        description
      }
    }
  }
`;
