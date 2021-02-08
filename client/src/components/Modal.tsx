import React, { PropsWithChildren } from "react";
// Modal
import ReactModal, { Props as ReactModalProps } from "react-modal";

// Props and default props
type Props = PropsWithChildren<ReactModalProps>;
const defaultProps = {
  portalClassName: "modal",
  overlayClassName: "modal__overlay",
  className: "modal__content",
  parentSelector: () => document.getElementById("modal-root") || document.body,
};

export const Modal = ({ children, ...rest }: Props) => {
  return <ReactModal {...rest}>{children}</ReactModal>;
};

Modal.defaultProps = defaultProps;
