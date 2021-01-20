import React, { InputHTMLAttributes } from "react";
// Utils
import { modifyAndMix } from "../../../utils/BEM";
// Types
import { BEM } from "../../../types";

// File interfaces
interface ControlProps {
  label: string;
  type: string;
}

// Props and default props
type Props = ControlProps & InputHTMLAttributes<HTMLInputElement> & BEM;
const defaultProps = {
  type: "checkbox",
};

export const Control = ({ label, type, modifiers, mixes, ...rest }: Props) => {
  // Manage received modifiers and mixes
  const modifiersAndMixes = modifyAndMix(modifiers, mixes, "control");

  // Handlers
  // -------------------------------------------------------------------
  const handleLabelKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    const keyCode = e.which || e.key;

    switch (keyCode) {
      case "Enter":
      case 13:
        e.currentTarget.click();
        break;
      default:
        break;
    }
  };

  return (
    <div className="h">
      <div
        className={`control ${
          type === "checkbox" ? "control--is-checkbox" : "control--is-radio"
        } ${
          !rest.disabled
            ? rest.checked
              ? "control--is-selected"
              : "control--is-not-selected"
            : "control--is-disabled"
        } ${modifiersAndMixes}`}
      >
        <span className="control__input-wrapper">
          <input className="control__input" type={type} {...rest} />
        </span>
        <label
          className="control__label"
          htmlFor={rest.id}
          onKeyDown={handleLabelKeyDown}
          tabIndex={rest.disabled ? -1 : 0}
        >
          <span className="control__dot-wrapper">
            <span className="control__dot"></span>
          </span>
          <span className="control__label-text">{label}</span>
        </label>
      </div>
    </div>
  );
};

Control.defaultProps = defaultProps;
