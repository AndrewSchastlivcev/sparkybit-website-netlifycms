import React, { Component } from "react";
import Modal from "../root-modal";
import formikEnhancer from "./validation/schemeFormik";

import { contactForm } from "./form-contact";

export default class ModalContact extends Component {
  render() {
    const { isModalOpen, setModalState, handleFormSubmit } = this.props;
    let EnhancedForm = formikEnhancer(contactForm);
    return (
      <Modal
        classNames={{ modal: "modal-contact-form" }}
        open={isModalOpen}
        onClose={() => setModalState(false)}
        center
      >
        {
          <EnhancedForm
            contactFields={{
              email: "",
              /* city: "", */
              name: "",
              phone: "",
              message: "",
              // recaptcha: "",
              closeHandler: null
            }}
            actionSubmit={handleFormSubmit}
          />
        }
      </Modal>
    );
  }
}
