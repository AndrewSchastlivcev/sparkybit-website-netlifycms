import React, { Component } from "react";
import 'react-responsive-modal/styles.css';
import Modal from "react-responsive-modal";
import classNames from "classnames";

export default class RootModal extends Component {
  render() {
    const { classNames: modalClasses, ...restProps } = this.props;
    return (
      <Modal
        classNames={{
          ...modalClasses,
          modal: classNames("root-modal", modalClasses.modal),
          overlay: classNames("root-modal-overlay", modalClasses.overlay)
        }}
        {...restProps}
      >
        {this.props.children}
      </Modal>
    );
  }
}
