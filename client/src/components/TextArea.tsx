import React, { TextareaHTMLAttributes } from "react";
// Utils
import { modifyAndMix } from "../utils/BEM";
// Types
import { BEMType } from "../types";

// File interfaces
interface ITextAreaProps {
  label?: string;
  information?: string;
}

// Props
type Props = ITextAreaProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> &
  BEMType;

const TextArea: React.FC<Omit<Props, "className">> = ({
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
    "text-area"
  );

  return (
    <div
      className={`text-area ${
        rest.disabled && "text-area--is-disabled"
      } ${modifiersAndMixes}`}
    >
      {label && (
        <>
          <label className="text-area__label" htmlFor={rest.id}>
            {label}
          </label>
          {rest.required && <em className="white-space-pre"> *</em>}
        </>
      )}
      <div className="text-area__input-wrapper">
        <textarea className="text-area__input" {...rest}></textarea>
      </div>
      {information && <p className="text-area__information">{information}</p>}
    </div>
  );
};

export default TextArea;
