import React, { ButtonHTMLAttributes } from "react";
// Utils
import { modifyAndMix } from "../../../utils/BEM";
// Types
import { BEM } from "../../../types";

// File interfaces
interface ButtonProps {
  text: string;
}

// Props and default props
type Props = ButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & BEM;
const defaultProps = {
  type: "button",
};

export const Button = ({
  text,
  modifiers: propsModifiers,
  mixes: propsMixes,
  ...rest
}: Props) => {
  // Manage received modifiers and mixes
  const modifiersAndMixes = modifyAndMix(propsModifiers, propsMixes, "button");

  return (
    <button className={`button ${modifiersAndMixes}`} {...rest}>
      {text}
    </button>
  );
};

Button.defaultProps = defaultProps;
