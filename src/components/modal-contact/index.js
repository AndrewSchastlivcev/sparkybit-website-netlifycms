import React, { Component } from "react";
import Modal from "../root-modal";
import { form } from "./form"

export default class ModalContact extends Component {
  render() {
    const { isModalOpen, setModalState/* , handleFormSubmit */ } = this.props;
    return (
      <Modal
        classNames={{ modal: "modal-contact-form" }}
        open={isModalOpen}
        onClose={() => setModalState(false)}
        center
      >
      {
        form(setModalState)
      }
      </Modal>
    );
  }
}