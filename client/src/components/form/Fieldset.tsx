import React, { useState, FieldsetHTMLAttributes } from "react";
// Utils
import { modifyAndMix } from "../../utils/BEM";
// Types
import { BEM } from "../../types";

// File interfaces
interface FieldsetProps {
  title?: string;
  information?: string[];
  isExpandable?: boolean;
  expandableInformation?: string;
}

// Props and default props
type Props = FieldsetProps & FieldsetHTMLAttributes<HTMLFieldSetElement> & BEM;

export const Fieldset = React.memo(
  ({
    title,
    information,
    isExpandable,
    expandableInformation,
    children,
    modifiers,
    mixes,
    ...rest
  }: Props) => {
    // States
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    // Manage received modifiers and mixes
    const modifiersAndMixes = modifyAndMix(modifiers, mixes, "fieldset");

    // Handlers
    // -------------------------------------------------------------------
    const handleHeaderClick = () => setIsExpanded((prevState) => !prevState);

    // Variables
    const expandableMessage =
      !expandableInformation && " - kliknij aby rozwinąć";

    const informationList =
      information &&
      information.map((message, index) => (
        <p className="fieldset__additional-information" key={index}>
          {message}
        </p>
      ));

    return (
      <fieldset
        className={`fieldset ${modifiersAndMixes} ${
          isExpanded && "fieldset--is-expanded"
        } ${isExpandable && "fieldset--is-expandable"}`}
        {...rest}
      >
        {title && (
          <header
            className="fieldset__header"
            onClick={isExpandable ? handleHeaderClick : undefined}
          >
            <h1 className="fieldset__title">
              {title}
              {isExpandable && !isExpanded && (
                <span className="fieldset__expandable-information">
                  {expandableMessage}
                </span>
              )}
            </h1>
            {informationList}
          </header>
        )}
        <div className="fieldset__children">{children}</div>
      </fieldset>
    );
  }
);
