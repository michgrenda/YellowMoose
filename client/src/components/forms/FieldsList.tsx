import React, { HTMLAttributes } from "react";
import classNames from "classnames";
// Utils
import { modifyAndMix } from "../../utils/BEM";
// Types
import { BEM } from "../../ts/types";

// File interfaces
interface FieldsListProps {
  inputs: React.ReactElement[];
  showSeparator?: boolean;
  separatorSymbol?: string;
}

// Props and default props
type Props = FieldsListProps & HTMLAttributes<HTMLDivElement> & BEM;
const defaultProps = {
  separatorSymbol: "/",
};

export const FieldsList = ({
  inputs,
  showSeparator,
  separatorSymbol,
  modifiers,
  mixes,
  ...rest
}: Props) => {
  // Manage received modifiers and mixes
  const modifiersAndMixes = modifyAndMix(modifiers, mixes, "fields-list");

  // Separator element
  const separator = (
    <span className="white-space-pre"> {separatorSymbol} </span>
  );

  // Variables
  const fieldsList = inputs.map((input, index, array) => (
    <React.Fragment key={index}>
      {input}
      {showSeparator && index !== array.length - 1 && separator}
    </React.Fragment>
  ));

  return (
    <div
      className={classNames(
        "fields-list",
        showSeparator && "fields-list--show-separator",
        modifiersAndMixes
      )}
      {...rest}
    >
      <div className="fields-list__fields">{fieldsList}</div>
    </div>
  );
};

FieldsList.defaultProps = defaultProps;
