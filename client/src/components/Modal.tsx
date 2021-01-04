import React from "react";
// Modal
import ReactModal, { Props as ReactModalProps } from "react-modal";

// Props
interface IModalProps {
  children: any;
}

type Props = IModalProps & ReactModalProps;

const defaultProps = {
  portalClassName: "modal",
  overlayClassName: "modal__overlay",
  className: "modal__content",
  parentSelector: () => document.getElementById("modal-root") || document.body,
};

const Modal = ({ children, ...rest }: Props) => {
  return <ReactModal {...rest}>{children}</ReactModal>;
};

Modal.defaultProps = defaultProps;

export default Modal;
