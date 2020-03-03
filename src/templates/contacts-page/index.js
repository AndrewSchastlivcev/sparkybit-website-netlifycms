import React, { Component } from "react";

import { graphql } from "gatsby";
import Layout from "../../components/Layout";
import Countries from "../../components/Countries";
import IconEnvelope from "../../../src/img/icon-message.svg";
import IconTel from "../../../src/img/icon-tel.svg";
import LeafletMap from "../../components/leaflet-map/index.js";
import ModalContact from "../../components/modal-contact";
import SEO from "../../components/seo/index";

import "./styles/index.scss";

export class ContactsPageTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = { country: this.props.countries[0], isModalOpen: false };
    this.setModalState = this._setModalState.bind(this);
    this.handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  getCountry = value => {
    this.setState({ country: value });
  };

  _setModalState = state => {
    if (this.state.isModalOpen !== state) {
      return this.setState({ isModalOpen: state });
    }
  };

  _handleFormSubmit() {
    this.setModalState(false);
  }

  render() {
    const { isModalOpen } = this.state;
    const { setModalState, handleFormSubmit } = this;
    const {
      contact_title,
      contact_email,
      contact_phone,
      btn_name,
      countries
    } = this.props;
    return (
      <>
        <SEO title={contact_title} />
        <main id="main">
          <div className="page-contacts container">
            <div className="content">
              <h1 className="h2 heading striped uppercase">{contact_title}</h1>
              <Countries countries={countries} getCountry={this.getCountry} />
              <div className="contacts">
                <div className="email">
                  <img src={IconEnvelope} alt="contact email" />
                  <span
                    onClick={() => this.setModalState(true)}
                    onKeyPress={() => {}}
                    role="button"
                    tabIndex={0}
                  >
                    {contact_email}
                  </span>
                </div>
                <div className="tel">
                  <img src={IconTel} alt="phone number" />
                  <a href={`tel:${contact_phone}`}>{contact_phone}</a>
                </div>
              </div>
              <div className="follow">
                <button
                  className="heading btn btn-primary trigger"
                  onClick={() => this.setModalState(true)}
                >
                  {btn_name}
                </button>
              </div>
            </div>
            <div className="map">
              <LeafletMap
                countries={this.state.country}
                getCountry={this.getCountry}
              />
            </div>
            <div className="circle circle-1" />
            <div className="circle circle-2" />
            <div className="circle circle-3" />
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

const ContactsPage = ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <Layout>
      <ContactsPageTemplate
        contact_title={post.frontmatter.contact_title}
        contact_email={post.frontmatter.contact_email}
        contact_phone={post.frontmatter.contact_phone}
        btn_name={post.frontmatter.btn_name}
        countries={post.frontmatter.countries}
      />
    </Layout>
  );
};

export default ContactsPage;

export const ContactsPageQuery = graphql`
  query ContactsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        contact_title
        contact_email
        contact_phone
        btn_name
        countries {
          country
          offices {
            office
            latitude_office
            longitude_office
          }
        }
      }
    }
  }
`;
