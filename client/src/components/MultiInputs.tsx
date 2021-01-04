import React from "react";
// Utils
import { modifyAndMix } from "../utils/BEM";
// Types
import { BEMType } from "../types";

// File interfaces
interface IMultiInputsProps {
  labels: { label: string; htmlFor: string }[];
  inputs: React.ReactNode[];
  required?: boolean;
  showSeparator?: boolean;
  separatorSymbol?: string;
}

// Props and default props
type Props = IMultiInputsProps & BEMType;
const defaultProps = {
  separatorSymbol: "/",
};

const MultiInputs: React.FC<Props> = ({
  modifiers: propsModifiers,
  mixes: propsMixes,
  ...rest
}) => {
  // Manage received modifiers and mixes
  const modifiersAndMixes = modifyAndMix(
    propsModifiers,
    propsMixes,
    "multi-inputs"
  );

  // Separator element
  const separator = (
    <span className="white-space-pre"> {rest.separatorSymbol} </span>
  );

  // Variables
  const labels = rest.labels.map((label, index, array) => (
    <React.Fragment key={label.htmlFor}>
      <label className="multi-inputs__label" htmlFor={label.htmlFor}>
        {label.label}
      </label>
      {index !== array.length - 1 && separator}
    </React.Fragment>
  ));

  const inputs = rest.inputs.map((input, index, array) => (
    <React.Fragment key={index}>
      {input}
      {rest.showSeparator && index !== array.length - 1 && separator}
    </React.Fragment>
  ));

  return (
    <div
      className={`multi-inputs ${modifiersAndMixes} ${
        rest.showSeparator && "multi-inputs--is-separator"
      }`}
    >
      <div className="multi-inputs__label-wrapper">
        {labels}
        {rest.required && <em className="white-space-pre"> *</em>}
      </div>
      <div className="multi-inputs__inputs-wrapper">{inputs}</div>
    </div>
  );
};

MultiInputs.defaultProps = defaultProps;

export default MultiInputs;
