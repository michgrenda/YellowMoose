import React, { HTMLAttributes } from "react";
// Rifm
import { useRifm } from "rifm";
import {
  replaceDotWithComma,
  formatFloatingPointNumber,
  formatInteger,
  parseNumber,
  parseInteger,
} from "../../../utils/rifm";
// React-hook-form
import { Controller } from "react-hook-form";
// Components
import { Fieldset } from "../../../components/form/Fieldset";
import { Label } from "../../../components/form/Label";
import { Field } from "../../../components/form/controls/Field";
import { ExtendedField } from "../../../components/form/controls/ExtendedField";
import { SelectField } from "../../..//components/form/controls/SelectField";
import { Control } from "../../../components/form/controls/Control";
import { LabelsList } from "../../../components/form/LabelsList";
import { FieldsList } from "../../../components/form/FieldsList";
// Handlers
import { handleInputChange, handleSelectChange } from "../../../utils/handlers";
// Types
import { BaseParametersState } from "../forms/OfferForm";
import {
  FieldsetProps,
  ControlReactHookForm,
  FieldsetWithErrors,
} from "../../../types";

// Options
const currencyOptions = [
  { value: "PLN", label: "zł" },
  { value: "USD", label: "$" },
  { value: "EUR", label: "€" },
];

const isRentInPriceOptions = [
  { value: "tak", label: "tak" },
  { value: "nie", label: "nie" },
];

const floorNumber = 60;
const floorAndNumberOfFloorsOptions = [...Array(floorNumber + 1)].map(
  (_, index) => ({
    value: String(index - 1),
    label: String(index - 1) || "parter",
  })
);

// Props and default props
type Props = FieldsetProps<BaseParametersState> &
  HTMLAttributes<HTMLDivElement> &
  ControlReactHookForm &
  FieldsetWithErrors;

export const BaseParameters = React.memo(
  ({
    data: baseParameters,
    setData: setBaseParameters,
    register,
    control,
    clearErrors,
    errors,
    ...rest
  }: Props) => {
    // Rifm
    const areaInput = useRifm({
      accept: /[\d.,]/g,
      format: (v) => formatFloatingPointNumber(v, 2),
      replace: replaceDotWithComma,
      value: baseParameters.area,
      onChange: (value) =>
        setBaseParameters((prevState) => ({
          ...prevState,
          area: parseNumber(value),
        })),
    });

    const roomsInput = useRifm({
      accept: /\d/g,
      format: formatInteger,
      value: baseParameters.rooms,
      onChange: (value) =>
        setBaseParameters((prevState) => ({
          ...prevState,
          rooms: parseInteger(value),
        })),
    });

    const priceInput = useRifm({
      accept: /\d/g,
      format: formatInteger,
      value: baseParameters.price,
      onChange: (value) =>
        setBaseParameters((prevState) => ({
          ...prevState,
          price: parseInteger(value),
        })),
    });

    // Variables
    const floorErrorMessage =
      errors.floor && errors.floor.value && errors.floor.value.message;
    const numberOfFloorsErrorMessage =
      errors.numberOfFloors &&
      errors.numberOfFloors.value &&
      errors.numberOfFloors.value.message;

    return (
      <div className="base-parameteres" {...rest}>
        <Fieldset title="informacje podstawowe" modifiers={["base-parameters"]}>
          <ExtendedField
            information="Możesz podać unikalne cechy nieruchomości, które zainteresują poszukujących."
            mixes={["fieldset"]}
            errorMessages={[errors.title && errors.title.message]}
          >
            <Label htmlFor="title" label="tytuł" isRequired />
            <Field
              id="title"
              name="title"
              value={baseParameters.title}
              onChange={(e) => handleInputChange(e, setBaseParameters)}
              required
              modifiers={["large"]}
              maxLength={50}
              register={register}
            />
          </ExtendedField>
          <ExtendedField
            mixes={["fieldset"]}
            errorMessages={[errors.area && errors.area.message]}
          >
            <Label htmlFor="area" label="powierzchnia (m²)" isRequired />
            <Field
              id="area"
              name="area"
              value={areaInput.value}
              onChange={areaInput.onChange}
              required
              modifiers={["medium"]}
              maxLength={10}
              register={register}
            />
          </ExtendedField>
          <ExtendedField
            mixes={["fieldset"]}
            errorMessages={[errors.rooms && errors.rooms.message]}
          >
            <Label htmlFor="rooms" label="liczba pokoi" isRequired />
            <Field
              id="rooms"
              name="rooms"
              value={roomsInput.value}
              onChange={roomsInput.onChange}
              required
              modifiers={["medium"]}
              maxLength={10}
              register={register}
            />
          </ExtendedField>
          <ExtendedField
            mixes={["fieldset"]}
            errorMessages={[errors.price && errors.price.message]}
          >
            <Label htmlFor="price" label="cena (czynsz)/mies" isRequired />
            <FieldsList
              inputs={[
                <Field
                  id="price"
                  name="price"
                  value={priceInput.value}
                  onChange={priceInput.onChange}
                  required
                  modifiers={["medium"]}
                  maxLength={10}
                  register={register}
                />,
                <SelectField
                  value={baseParameters.currency}
                  defaultValue={baseParameters.currency}
                  onChange={(option) =>
                    handleSelectChange(option, setBaseParameters, "currency")
                  }
                  options={currencyOptions}
                  widthExtraSmall={true}
                  isRequired
                />,
              ]}
            />
          </ExtendedField>
          <Control
            id="negotiable"
            name="negotiable"
            label="cena do negocjacji"
            value="negotiable"
            checked={baseParameters.negotiable}
            onChange={(e) => handleInputChange(e, setBaseParameters)}
            mixes={["fieldset"]}
          />
          <ExtendedField mixes={["fieldset"]}>
            <Label
              htmlFor="isRentInPrice"
              label="czy cena zawiera czynsz dla administracji"
            />
            <SelectField
              value={baseParameters.isRentInPrice}
              onChange={(option) =>
                handleSelectChange(option, setBaseParameters, "isRentInPrice")
              }
              options={isRentInPriceOptions}
              widthSmall={true}
              isSearchable={false}
              name="isRentInPrice"
              inputId="isRentInPrice"
            />
          </ExtendedField>
          <ExtendedField
            mixes={["fieldset"]}
            errorMessages={[floorErrorMessage, numberOfFloorsErrorMessage]}
          >
            <LabelsList
              isRequired
              showSeparator
              labels={[
                <Label htmlFor="floor" label="piętro" />,
                <Label htmlFor="numberOfFloors" label="liczba pięter" />,
              ]}
            />
            <FieldsList
              showSeparator
              inputs={[
                <Controller
                  name="floor"
                  control={control}
                  render={(props) => (
                    <div ref={props.ref} tabIndex={0}>
                      <SelectField
                        value={baseParameters.floor}
                        onChange={(option) => {
                          handleSelectChange(
                            option,
                            setBaseParameters,
                            "floor"
                          );
                          props.onChange(option);
                          props.onBlur();
                          if (baseParameters.numberOfFloors)
                            clearErrors("numberOfFloors");
                        }}
                        options={floorAndNumberOfFloorsOptions}
                        widthSmall={true}
                        isSearchable={false}
                        name="floor"
                        inputId="floor"
                        isRequired
                      />
                    </div>
                  )}
                />,
                <Controller
                  name="numberOfFloors"
                  control={control}
                  render={(props) => (
                    <div ref={props.ref} tabIndex={0}>
                      <SelectField
                        value={baseParameters.numberOfFloors}
                        onChange={(option) => {
                          handleSelectChange(
                            option,
                            setBaseParameters,
                            "numberOfFloors"
                          );
                          props.onChange(option);
                          props.onBlur();
                          if (baseParameters.floor) clearErrors("floor");
                        }}
                        options={floorAndNumberOfFloorsOptions}
                        widthSmall={true}
                        isSearchable={false}
                        name="numberOfFloors"
                        inputId="numberOfFloors"
                        isRequired
                      />
                    </div>
                  )}
                />,
              ]}
            />
          </ExtendedField>
        </Fieldset>
      </div>
    );
  }
);
