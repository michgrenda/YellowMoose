import React from "react";
// React-select
import Select, { Props as ReactSelectProps } from "react-select";
import { customStyles } from "../utils/react-select/styles";
// Utils
import { modifyAndMix } from "../utils/BEM";
// Types
import { BEMType } from "../types";

// File interfaces
interface ISelectInputProps {
  label?: string;
  required?: boolean;
}

// Props and default props
type Props = ISelectInputProps & ReactSelectProps & BEMType;
const defaultProps = {
  components: {
    IndicatorSeparator: () => null,
  },
  className: "select-input-wrapper",
  classNamePrefix: "select-input",
  styles: customStyles,
  menuPlacement: "auto",
  noOptionsMessage: () => "Brak opcji",
  placeholder: "Wybierz...",
};

export const SelectInput = ({
  label,
  required,
  modifiers: propsModifiers,
  mixes: propsMixes,
  ...rest
}: Props) => {
  // Manage received modifiers and mixes
  const modifiersAndMixes = modifyAndMix(
    propsModifiers,
    propsMixes,
    "select-input-helper"
  );

  return (
    <div className={`select-input-helper ${modifiersAndMixes}`}>
      {label && (
        <>
          <label htmlFor={rest.name} className="select-input-helper__label">
            {label}
          </label>
          {required && <em className="white-space-pre"> *</em>}
        </>
      )}
      <div className="select-input-helper__inputs-wrapper">
        <Select {...rest} />
      </div>
    </div>
  );
};

SelectInput.defaultProps = defaultProps;

export default SelectInput;
