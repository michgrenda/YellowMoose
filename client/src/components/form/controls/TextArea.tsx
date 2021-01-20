import React, { TextareaHTMLAttributes } from "react";
// Utils
import { modifyAndMix } from "../../../utils/BEM";
// Types
import { BEM } from "../../../types";

// File interfaces
interface TextAreaProps {
  label?: string;
  information?: string;
}

// Props and default props
type Props = TextAreaProps & TextareaHTMLAttributes<HTMLTextAreaElement> & BEM;

export const TextArea = ({ modifiers, mixes, ...rest }: Props) => {
  // Manage received modifiers and mixes
  const modifiersAndMixes = modifyAndMix(modifiers, mixes, "text-area");

  return (
    <div
      className={`text-area ${modifiersAndMixes} ${
        rest.disabled && "text-area--is-disabled"
      }`}
    >
      <div className="text-area__input-wrapper">
        <textarea className="text-area__input" {...rest}></textarea>
      </div>
    </div>
  );
};
