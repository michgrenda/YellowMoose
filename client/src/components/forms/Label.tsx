import React, { LabelHTMLAttributes } from "react";

import classNames from "classnames";
// Utils
import { modifyAndMix } from "../../utils/BEM";
// Types
import { BEM } from "../../ts/types";

// File interfaces
interface LabelProps {
  label: string;
  isRequired?: boolean;
  requiredSymbol?: string;
}

// Props and default props
export type Props = LabelProps & LabelHTMLAttributes<HTMLLabelElement> & BEM;
const defaultProps = {
  requiredSymbol: "*",
};

export const Label = ({
  label,
  isRequired,
  requiredSymbol,
  modifiers,
  mixes,
  ...rest
}: Props) => {
  // Manage received modifiers and mixes
  const modifiersAndMixes = modifyAndMix(modifiers, mixes, "label");

  return (
    <>
      <label className={classNames("label", modifiersAndMixes)} {...rest}>
        {label}
      </label>
      {isRequired && <em className="white-space-pre"> {requiredSymbol}</em>}
    </>
  );
};

Label.defaultProps = defaultProps;
