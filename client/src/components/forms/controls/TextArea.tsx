import React, { TextareaHTMLAttributes } from "react";
import classNames from "classnames";
// Utils
import { modifyAndMix } from "../../../utils/BEM";
// Types
import { BEM, ControlReactHookForm } from "../../../ts/types";

// Props and default props
type Props = TextareaHTMLAttributes<HTMLTextAreaElement> &
  BEM &
  ControlReactHookForm;

export const TextArea = ({ register, modifiers, mixes, ...rest }: Props) => {
  // Manage received modifiers and mixes
  const modifiersAndMixes = modifyAndMix(modifiers, mixes, "text-area");

  return (
    <div
      className={classNames(
        "text-area",
        rest.disabled && "text-area--is-disabled",
        modifiersAndMixes
      )}
    >
      <div className="text-area__input-wrapper">
        <textarea
          className="text-area__input"
          ref={register}
          {...rest}
        ></textarea>
      </div>
    </div>
  );
};
