import React, { InputHTMLAttributes } from "react";
// Utils
import { modifyAndMix } from "../utils/BEM";
// Types
import { BEMType } from "../types";

// File interfaces
interface ITextInputProps {
  label?: string;
  information?: string;
}

// Props and default props
type Props = ITextInputProps & InputHTMLAttributes<HTMLInputElement> & BEMType;

const TextInput: React.FC<Omit<Props, "type" | "className">> = ({
  label,
  information,
  modifiers: propsModifiers,
  mixes: propsMixes,
  ...rest
}) => {
  // Manage received modifiers and mixes
  const modifiersAndMixes = modifyAndMix(
    propsModifiers,
    propsMixes,
    "text-input"
  );

  return (
    <div
      className={`text-input ${
        rest.disabled && "text-input--is-disabled"
      } ${modifiersAndMixes}`}
    >
      {label && (
        <>
          <label className="text-input__label" htmlFor={rest.id}>
            {label}
          </label>
          {rest.required && <em className="white-space-pre"> *</em>}
        </>
      )}
      <div className="text-input__input-wrapper">
        <input className="text-input__input" type="text" {...rest} />
      </div>
      {information && <p className="text-input__information">{information}</p>}
    </div>
  );
};

export default TextInput;
