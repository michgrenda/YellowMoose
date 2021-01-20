import React, { HTMLAttributes } from "react";
// Utils
import { modifyAndMix } from "../../utils/BEM";
// Types
import { BEM } from "../../types";

// File interfaces
interface ControlsListProps {
  inputs: React.ReactElement[];
  n: number;
}

// Props and defaultProps
type Props = ControlsListProps & HTMLAttributes<HTMLDivElement> & BEM;

export const ControlsList = ({
  inputs,
  n,
  modifiers,
  mixes,
  ...rest
}: Props) => {
  // Manage received modifiers and mixes
  const modifiersAndMixes = modifyAndMix(modifiers, mixes, "controls-list");

  // Variables
  const controlsList = inputs.map((input) => input);

  return (
    <div className={`controls-list ${modifiersAndMixes}`} {...rest}>
      <div className="controls-list__row">
        {new Array(Math.ceil(controlsList.length / n))
          .fill(0)
          .map((_, index) => (
            <div className="controls-list__col" key={index}>
              {controlsList.splice(0, n)}
            </div>
          ))}
      </div>
    </div>
  );
};
