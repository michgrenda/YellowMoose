import React, { HTMLAttributes } from "react";
// Components
import { Fieldset } from "../../../components/form/Fieldset";
import { Control } from "../../../components/form/controls/Control";
// Handlers
import { handleInputChange } from "../../../utils/handlers";
// Types
import { PropertyTypeState } from "../forms/OfferForm";
import { FieldsetProps } from "../../../types";

// Data
const propertyTypes = [
  {
    id: "flat",
    label: "mieszkanie",
    value: "flat",
  },
  {
    id: "house",
    label: "dom",
    value: "house",
  },
  {
    id: "plot",
    label: "działka",
    value: "plot",
  },
  {
    id: "commercial-building",
    label: "lokal komercyjny",
    value: "commercial-building",
  },
  {
    id: "garage",
    label: "garaż",
    value: "garage",
  },
  {
    id: "room",
    label: "pokój",
    value: "room",
  },
];

// Props and default props
type Props = FieldsetProps<PropertyTypeState> & HTMLAttributes<HTMLDivElement>;

export const PropertyType = React.memo(
  ({ data: propertyType, setData: setPropertyType, ...rest }: Props) => {
    // Variables
    const propertyTypesRadioInputs = propertyTypes.map((data) => (
      <div className="col-4" key={data.id}>
        <Control
          id={data.id}
          name="type"
          label={data.label}
          checked={propertyType.type === data.value}
          value={data.value}
          onChange={(e) => handleInputChange(e, setPropertyType, true)}
          type="radio"
          modifiers={["image"]}
          mixes={["fieldset"]}
        />
      </div>
    ));

    return (
      <div className="transaction" {...rest}>
        <Fieldset modifiers={["types-box"]}>
          <div className="row">{propertyTypesRadioInputs}</div>
        </Fieldset>
      </div>
    );
  }
);
