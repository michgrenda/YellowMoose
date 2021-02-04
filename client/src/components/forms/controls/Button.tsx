import React, { ButtonHTMLAttributes } from "react";
// Utils
import { modifyAndMix } from "../../../utils/BEM";
// Types
import { BEM } from "../../../ts/types";

// File interfaces
interface ButtonProps {
  text?: string;
  icon?: React.ReactElement;
}

// Props and default props
type Props = ButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & BEM;

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ text, icon, modifiers, mixes, ...rest }, ref) => {
    // Manage received modifiers and mixes
    const modifiersAndMixes = modifyAndMix(modifiers, mixes, "button");

    return (
      <button className={`button ${modifiersAndMixes}`} ref={ref} {...rest}>
        {icon && <span className="button__icon">{icon}</span>}
        {text && <span className="button__text">{text}</span>}
      </button>
    );
  }
);
