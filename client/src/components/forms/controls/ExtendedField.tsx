import React, { HTMLAttributes } from "react";
// Utils
import { modifyAndMix } from "../../../utils/BEM";
// Components
import { Error } from "../Error";
// Types
import { BEM } from "../../../ts/types";

// File interfaces
interface ExtendedFieldProps {
  children?: React.ReactNode;
  information?: string;
  errorMessages?: string[];
}

// Props and default props
type Props = ExtendedFieldProps & HTMLAttributes<HTMLDivElement> & BEM;

export const ExtendedField = ({
  children,
  information,
  errorMessages,
  modifiers,
  mixes,
  ...rest
}: Props) => {
  // Manage received modifiers and mixes
  const modifiersAndMixes = modifyAndMix(modifiers, mixes, "extended-field");

  // Variables
  const errorsList =
    errorMessages &&
    errorMessages
      .filter((errorMessage) => errorMessage)
      .map((errorMessage, index) => (
        <Error errorMessage={errorMessage} key={index} />
      ));

  return (
    <div
      className={`extended-field ${modifiersAndMixes}`}
      data-valid={
        errorsList ? (errorsList.length ? "invalid" : "valid") : "valid"
      }
      {...rest}
    >
      {children}
      {information && (
        <p className="extended-field__information">{information}</p>
      )}
      <div className="extended-field__errors">{errorsList}</div>
    </div>
  );
};
