import React, { Component } from "react";
import Modal from "../root-modal";
// import formikEnhancer from "./validation/schemeFormik";

// import { contactForm } from "./form-contact";
import { form } from "./form"

export default class ModalContact extends Component {
  render() {
    const { isModalOpen, setModalState/* , handleFormSubmit */ } = this.props;
    // let EnhancedForm = formikEnhancer(contactForm);
    return (
      <Modal
        classNames={{ modal: "modal-contact-form" }}
        open={isModalOpen}
        onClose={() => setModalState(false)}
        center
      >
      {
        form()
      }
      </Modal>
    );
  }
}