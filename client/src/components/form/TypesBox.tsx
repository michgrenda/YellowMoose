import React, { useState, useEffect } from "react";
// Components
import RadioInput from "../RadioInput";

// Radio inputs
const propertyTypes = [
  {
    id: "flat",
    name: "type",
    label: "mieszkanie",
    value: "flat",
  },
  {
    id: "house",
    name: "type",
    label: "dom",
    value: "house",
  },
  {
    id: "plot",
    name: "type",
    label: "działka",
    value: "plot",
  },
  {
    id: "commercial-building",
    name: "type",
    label: "lokal komercyjny",
    value: "commercial-building",
  },
  {
    id: "garage",
    name: "type",
    label: "garaż",
    value: "garage",
  },
  {
    id: "room",
    name: "type",
    label: "pokój",
    value: "room",
  },
];

// File types
type PropertyType =
  | "flat"
  | "house"
  | "plot"
  | "commercial-building"
  | "garage"
  | "room";

// File interfaces
interface ITypesBoxProps {
  propertyType: PropertyType;
  setData: React.Dispatch<
    React.SetStateAction<{
      [index: string]: any;
    }>
  >;
}

// Props and default props
type Props = ITypesBoxProps;
const defaultProps = {
  propertyType: "flat",
};

const TypesBox = (props: Props) => {
  const { setData } = props;

  // States
  const [propertyType, setPropertyType] = useState<string>(props.propertyType);

  // Update parent's state
  useEffect(() => {
    setData((prevState) => ({ ...prevState, propertyType }));
  }, [setData, propertyType]);

  // Handlers
  // -------------------------------------------------------------------
  const handleRadioInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPropertyType(e.target.value);

  // Variables
  const propertyTypesRadioInputs = propertyTypes.map((data) => (
    <div className="col-4" key={data.id}>
      <div className="types-box__option">
        <RadioInput
          id={data.id}
          name={data.name}
          label={data.label}
          checked={propertyType === data.value}
          value={data.value}
          onChange={handleRadioInputChange}
          modifiers={["image"]}
          mixes={["types-box"]}
        />
      </div>
    </div>
  ));

  return (
    <fieldset className="types-box">
      <div className="row">{propertyTypesRadioInputs}</div>
    </fieldset>
  );
};

TypesBox.defaultProps = defaultProps;

export default TypesBox;
