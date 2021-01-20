import React, { InputHTMLAttributes } from "react";
// Utils
import { modifyAndMix } from "../../../utils/BEM";
// Types
import { BEM, ControlReactHookForm } from "../../../types";

// Props and default props
export type Props = InputHTMLAttributes<HTMLInputElement> &
  BEM &
  ControlReactHookForm;

export const Field = ({
  register,
  modifiers: propsModifiers,
  mixes: propsMixes,
  ...rest
}: Props) => {
  // Manage received modifiers and mixes
  const modifiersAndMixes = modifyAndMix(propsModifiers, propsMixes, "field");

  return (
    <div
      className={`field ${modifiersAndMixes} ${
        rest.disabled && "field--is-disabled"
      } `}
    >
      <div className="field__input-wrapper">
        <input className="field__input" type="text" ref={register} {...rest} />
      </div>
    </div>
  );
};
