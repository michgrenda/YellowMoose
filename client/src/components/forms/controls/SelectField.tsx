import React from "react";
import classNames from "classnames";
// React-select
import Select, { Props as ReactSelectProps } from "react-select";
import { customStyles } from "../../../utils/react-select/styles";
// Utils
import { modifyAndMix } from "../../../utils/BEM";
// Types
import { BEM } from "../../../ts/types";

// File interfaces
interface SelectFieldProps {
  isRequired?: boolean;
}

// Props and default props
type Props = SelectFieldProps & ReactSelectProps & BEM;
const defaultProps = {
  className: "select-field-wrapper",
  classNamePrefix: "select-field",
  styles: customStyles,
  menuPlacement: "auto",
  noOptionsMessage: () => "Brak opcji",
  placeholder: "Wybierz...",
};

export const SelectField = ({
  className,
  isRequired,
  modifiers,
  mixes,
  ...rest
}: Props) => {
  // Manage received modifiers and mixes
  const modifiersAndMixes = modifyAndMix(modifiers, mixes, className);

  return (
    <Select
      className={classNames(className, modifiersAndMixes)}
      required={isRequired}
      {...rest}
    />
  );
};

SelectField.defaultProps = defaultProps;
