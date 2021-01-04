import React, { InputHTMLAttributes } from "react";
// Utils
import { modifyAndMix } from "../utils/BEM";
// Types
import { BEMType } from "../types";

// File interfaces
interface ICheckboxInputProps {
  label: string;
}

// Props and default props
type Props = ICheckboxInputProps &
  InputHTMLAttributes<HTMLInputElement> &
  BEMType;

const CheckboxInput: React.FC<Omit<Props, "type" | "className">> = ({
  label,
  checked: propsChecked,
  modifiers: propsModifiers,
  mixes: propsMixes,
  ...rest
}) => {
  // Manage received modifiers and mixes
  const modifiersAndMixes = modifyAndMix(
    propsModifiers,
    propsMixes,
    "checkbox-input"
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

  // Variables
  const checked = Boolean(propsChecked);

  return (
    <div data-helper="helper">
      <div
        className={`checkbox-input ${
          !rest.disabled
            ? checked
              ? "checkbox-input--is-selected"
              : "checkbox-input--is-not-selected"
            : "checkbox-input--is-disabled"
        } ${modifiersAndMixes}`}
      >
        <span className="checkbox-input__input-wrapper">
          <input
            className="checkbox-input__input"
            type="checkbox"
            checked={checked}
            {...rest}
          />
        </span>
        <label
          className="checkbox-input__label"
          htmlFor={rest.id}
          tabIndex={rest.disabled ? -1 : 0}
          onKeyDown={handleLabelKeyDown}
        >
          <span className="checkbox-input__dot-wrapper">
            <span className="checkbox-input__dot"></span>
          </span>
          <span className="checkbox-input__label-text">{label}</span>
        </label>
      </div>
    </div>
  );
};

export default CheckboxInput;
