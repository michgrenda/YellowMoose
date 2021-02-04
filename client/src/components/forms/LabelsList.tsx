import React, { HTMLAttributes } from "react";
// Utils
import { modifyAndMix } from "../../utils/BEM";
// Types
import { BEM } from "../../ts/types";

// File interfaces
interface LabelsListProps {
  labels: React.ReactElement[];
  isRequired?: boolean;
  showSeparator?: boolean;
  separatorSymbol?: string;
  requiredSymbol?: string;
}

// Props and default props
type Props = LabelsListProps & HTMLAttributes<HTMLDivElement> & BEM;
const defaultProps = {
  separatorSymbol: "/",
  requiredSymbol: "*",
};

export const LabelsList = ({
  labels,
  isRequired,
  showSeparator,
  separatorSymbol,
  requiredSymbol,
  modifiers,
  mixes,
  ...rest
}: Props) => {
  // Manage received modifiers and mixes
  const modifiersAndMixes = modifyAndMix(modifiers, mixes, "labels-list");

  // Separator element
  const separator = (
    <span className="white-space-pre"> {separatorSymbol} </span>
  );

  // Variables
  const labelsList = labels.map((label, index, array) => (
    <React.Fragment key={index}>
      {label}
      {showSeparator && index !== array.length - 1 && separator}
    </React.Fragment>
  ));

  return (
    <div
      className={`labels-list ${modifiersAndMixes} ${
        showSeparator && "labels-list--show-separator"
      }`}
      {...rest}
    >
      <div className="labels-list__labels">
        {labelsList}
        {isRequired && <em className="white-space-pre"> {requiredSymbol}</em>}
      </div>
    </div>
  );
};

LabelsList.defaultProps = defaultProps;
