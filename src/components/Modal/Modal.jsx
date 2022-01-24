import React, { Component } from "react";
import { createPortal } from "react-dom";
import { Backdrop, ModalContent } from "./Modal.styled";

const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.code === "Escape") {
      this.props.onClose();
    }
  };

  handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <Backdrop onClick={this.handleBackdropClick}>
        <ModalContent>
          {this.props.children}
          <img src={this.props.url} alt="" />
        </ModalContent>
      </Backdrop>,
      modalRoot
    );
  }
}
