import React, { Component } from "react";
import ModalContact from "../../components/modal-contact";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
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
    const { isModalOpen } = this.state;
    const { setModalState, handleFormSubmit } = this;
    const year = new Date().getFullYear();
    return (
      <footer id="footer">
        <div className="container">
          <div className="footer-columns">
            <div className="col contacts">
              <a href="tel:+442081331821">+44 20 3773 8945</a>
              <div>
                <span
                  onClick={() => this.setModalState(true)}
                  onKeyPress={() => {}}
                  role="button"
                  tabIndex={0}
                >
                  hi@sparkybit.com
                </span>
              </div>
            </div>
            <div className="col social-links">
              <a
                target="__blank"
                href={"https://www.facebook.com/Sparkybit-232812654328307/"}
                className="fb"
              >
                Facebook
              </a>
              <a
                target="__blank"
                href={"https://twitter.com/sparkybit"}
                className="tw"
              >
                Twitter
              </a>
              <a
                target="__blank"
                href={"https://www.instagram.com/sparkybit_official/"}
                className="in"
              >
                Instagram
              </a>
              <a
                target="__blank"
                href={"https://www.linkedin.com/company/sparkybit/"}
                className="ln"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <div className="copyright">
            {year} &copy; Sparkybit. All rights reserved
          </div>
        </div>
        <ModalContact
          isModalOpen={isModalOpen}
          setModalState={setModalState}
          handleFormSubmit={handleFormSubmit}
        />
      </footer>
    );
  }
}

export default Footer;
