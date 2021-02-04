import React, { InputHTMLAttributes } from "react";
// Utils
import { modifyAndMix } from "../../../utils/BEM";
// Types
import { BEM, ControlReactHookForm } from "../../../ts/types";

// File interfaces
interface FieldProps {
  render?: Function;
}

// Props and default props
export type Props = FieldProps &
  InputHTMLAttributes<HTMLInputElement> &
  BEM &
  ControlReactHookForm;

export const Field = ({
  render,
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
        {render ? (
          render("field__input")
        ) : (
          <input
            className="field__input"
            type="text"
            ref={register}
            {...rest}
          />
        )}
      </div>
    </div>
  );
};
