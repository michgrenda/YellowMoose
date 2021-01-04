import React, { InputHTMLAttributes } from "react";
// Utils
import { modifyAndMix } from "../utils/BEM";
// Types
import { BEMType } from "../types";

// File interfaces
interface IRadioInputProps {
  label: string;
}

// Props and default props
type Props = IRadioInputProps & InputHTMLAttributes<HTMLInputElement> & BEMType;

const RadioInput: React.FC<Omit<Props, "type" | "className">> = ({
  label,
  modifiers: propsModifiers,
  mixes: propsMixes,
  ...rest
}) => {
  // Manage received modifiers and mixes
  const modifiersAndMixes = modifyAndMix(
    propsModifiers,
    propsMixes,
    "radio-input"
  );

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
    <div
      className={`radio-input ${
        !rest.disabled
          ? rest.checked
            ? "radio-input--is-selected"
            : "radio-input--is-not-selected"
          : "radio-input--is-disabled"
      } ${modifiersAndMixes}`}
    >
      <span className="radio-input__input-wrapper">
        <input className="radio-input__input" type="radio" {...rest} />
      </span>
      <label
        className="radio-input__label"
        htmlFor={rest.id}
        tabIndex={rest.disabled ? -1 : 0}
        onKeyDown={handleLabelKeyDown}
      >
        <span className="radio-input__dot-wrapper">
          <span className="radio-input__dot"></span>
        </span>
        <span className="radio-input__label-text">{label}</span>
      </label>
    </div>
  );
};

export default RadioInput;
