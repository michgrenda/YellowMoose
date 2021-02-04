import React, { useState, useRef, useEffect, HTMLAttributes } from "react";
// React-hook-form
import { Controller } from "react-hook-form";
// Components
import { Fieldset } from "../../../components/forms/Fieldset";
import { Control } from "../../../components/forms/controls/Control";
import { ControlsList } from "../../../components/forms/ControlsList";
import { Portal } from "../../Portal";
// Types
import { ControlReactHookForm, FieldsetWithErrors } from "../../../ts/types";

// Data
const _houseTypes = [
  { value: "houseType1", label: "wolnostojący" },
  { value: "houseType2", label: "kamienica" },
  { value: "houseType3", label: "letniskowy" },
  { value: "houseType4", label: "bliźniak" },
  { value: "houseType5", label: "pałac / dworek" },
  { value: "houseType6", label: "atrialny" },
  { value: "houseType7", label: "szeregowiec" },
  { value: "houseType8", label: "gospodarstwo" },
  { value: "houseType9", label: "inny" },
];

const _plotTypes = [
  { value: "plotType1", label: "rolna" },
  { value: "plotType2", label: "budowlana-wielorodzinna" },
  { value: "plotType3", label: "siedlisko" },
  { value: "plotType4", label: "budowlana" },
  { value: "plotType5", label: "leśna" },
  { value: "plotType6", label: "przemysłowa" },
  { value: "plotType7", label: "budowlana-jednorodzinna" },
  { value: "plotType8", label: "rekreacyjna" },
  { value: "plotType9", label: "handlowo-usługowa" },
];

const propertyTypes = [
  {
    value: "flat",
    label: "mieszkanie",
  },
  {
    value: "house",
    label: "dom",
    subtypes: {
      name: "houseType",
      types: _houseTypes,
    },
  },
  {
    value: "plot",
    label: "działka",
    subtypes: {
      name: "plotType",
      types: _plotTypes,
    },
  },
  {
    value: "commercialBuilding",
    label: "lokal komercyjny",
  },
  {
    value: "garage",
    label: "garaż",
  },
  {
    value: "room",
    label: "pokój",
  },
];

const propertySubtypes = ["house", "plot"];

// File types
export type PropertyTypeType =
  | "flat"
  | "house"
  | "plot"
  | "commercial-building"
  | "garage"
  | "room";

// File interfaces
interface PropertyTypeProps {
  propertyType?: PropertyTypeType;
}

// Props and default props
type Props = PropertyTypeProps &
  HTMLAttributes<HTMLDivElement> &
  ControlReactHookForm &
  FieldsetWithErrors;

export const PropertyType = React.memo(
  ({
    propertyType: propertyTypeProps = "flat",
    register,
    control,
    errors,
    watch,
    ...rest
  }: Props) => {
    // States
    const [mounted, setMounted] = useState<boolean>(false);
    // Types states
    const [propertyType, setPropertyType] = useState<PropertyTypeType>(
      propertyTypeProps
    );
    // Subtypes states
    const [subtype, setSubtype] = useState<string>(null!);

    // References
    const subtypeRef = useRef<HTMLDivElement>(null!);

    // Refresh (solution to portal problem)
    useEffect(() => {
      setMounted(true);
    }, []);

    // Variables
    // Generate property types and subtypes as radio inputs
    const propertyTypesRadioInputs = (
      <Controller
        name="propertyType"
        control={control}
        defaultValue={propertyType}
        render={(
          { onChange, onBlur, value, name, ref },
          { invalid, isTouched, isDirty }
        ) => (
          <>
            {propertyTypes.map(({ label, value: typeValue, subtypes }) => {
              const isTypeChecked = propertyType === typeValue;

              return (
                <div className="col-4" key={typeValue}>
                  <Control
                    id={typeValue}
                    name={name}
                    label={label}
                    checked={isTypeChecked}
                    onChange={(e) => {
                      const value = e.target.value as PropertyTypeType;
                      setPropertyType(value);
                      onChange(value);
                    }}
                    value={typeValue}
                    type="radio"
                    modifiers={["image"]}
                    mixes={["fieldset"]}
                  />
                  {subtypes && isTypeChecked && (
                    <Portal container={subtypeRef.current}>
                      <Controller
                        name={subtypes.name}
                        control={control}
                        defaultValue={subtype}
                        render={(
                          { onChange, onBlur, value, name, ref },
                          { invalid, isTouched, isDirty }
                        ) => {
                          const propertySubtypesRadioInputs = subtypes.types.map(
                            ({ value: subtypeValue, label }) => (
                              <Control
                                id={subtypeValue}
                                name={name}
                                label={label}
                                value={subtypeValue}
                                checked={subtype === subtypeValue}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setSubtype(value);
                                  onChange(value);
                                }}
                                type="radio"
                                modifiers={["display-block"]}
                                key={subtypeValue}
                              />
                            )
                          );

                          return (
                            <ControlsList
                              inputs={propertySubtypesRadioInputs}
                              n={3}
                            />
                          );
                        }}
                      />
                    </Portal>
                  )}
                </div>
              );
            })}
          </>
        )}
      />
    );
    // Render subtypes
    const areSubtypes = propertySubtypes.includes(propertyType);

    return (
      <div className="property-type" {...rest}>
        <Fieldset modifiers={["property-type-box"]}>
          <div className="row">
            {propertyTypesRadioInputs}
            <div className="col-12">
              <div
                className={`property-type__subtype ${!areSubtypes && "d-none"}`}
                ref={subtypeRef}
              >
                {/* Subtype portal */}
              </div>
            </div>
          </div>
        </Fieldset>
      </div>
    );
  }
);
