import React, { HTMLAttributes } from "react";
// React-number-format
import NumberFormat from "react-number-format";
// React-hook-form
import { Controller } from "react-hook-form";
// Components
import { Fieldset } from "../../../components/forms/Fieldset";
import { Label } from "../../../components/forms/Label";
import { Field } from "../../../components/forms/controls/Field";
import { ExtendedField } from "../../../components/forms/controls/ExtendedField";
import { SelectField } from "../../..//components/forms/controls/SelectField";
import { Control } from "../../../components/forms/controls/Control";
import { LabelsList } from "../../../components/forms/LabelsList";
import { FieldsList } from "../../../components/forms/FieldsList";
// Types
import { ControlReactHookForm, FieldsetWithErrors } from "../../../ts/types";

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
type Props = HTMLAttributes<HTMLDivElement> &
  ControlReactHookForm &
  FieldsetWithErrors;

export const BaseParameters = React.memo(
  ({ register, control, clearErrors, errors, watch, ...rest }: Props) => {
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
              required
              modifiers={["large"]}
              register={register}
            />
          </ExtendedField>
          <ExtendedField
            mixes={["fieldset"]}
            errorMessages={[errors.area && errors.area.message]}
          >
            <Label htmlFor="area" label="powierzchnia (m²)" isRequired />
            <Field
              modifiers={["medium"]}
              render={(className: string) => (
                <Controller
                  as={NumberFormat}
                  thousandSeparator=" "
                  decimalSeparator=","
                  decimalScale={2}
                  allowedDecimalSeparators={[".", ","]}
                  allowNegative={false}
                  id="area"
                  name="area"
                  required
                  control={control}
                  className={className}
                />
              )}
            />
          </ExtendedField>
          <ExtendedField
            mixes={["fieldset"]}
            errorMessages={[errors.rooms && errors.rooms.message]}
          >
            <Label htmlFor="rooms" label="liczba pokoi" isRequired />
            <Field
              modifiers={["medium"]}
              render={(className: string) => (
                <Controller
                  as={NumberFormat}
                  thousandSeparator=""
                  decimalScale={0}
                  allowNegative={false}
                  id="rooms"
                  name="rooms"
                  required
                  control={control}
                  className={className}
                />
              )}
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
                  modifiers={["medium"]}
                  render={(className: string) => (
                    <Controller
                      as={NumberFormat}
                      thousandSeparator=" "
                      decimalSeparator=","
                      decimalScale={2}
                      allowedDecimalSeparators={[".", ","]}
                      allowNegative={false}
                      id="price"
                      name="price"
                      required
                      control={control}
                      className={className}
                    />
                  )}
                />,
                <Controller
                  name="currency"
                  control={control}
                  defaultValue={currencyOptions[0]}
                  render={(
                    { onChange, onBlur, value, name, ref },
                    { invalid, isTouched, isDirty }
                  ) => (
                    <SelectField
                      value={value}
                      defaultValue={currencyOptions[0]}
                      onChange={onChange}
                      options={currencyOptions}
                      widthExtraSmall={true}
                      isRequired
                    />
                  )}
                />,
              ]}
            />
          </ExtendedField>
          <Controller
            name="negotiable"
            control={control}
            defaultValue={false}
            render={(
              { onChange, onBlur, value, name, ref },
              { invalid, isTouched, isDirty }
            ) => (
              <Control
                id={name}
                name={name}
                label="cena do negocjacji"
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
                mixes={["fieldset"]}
              />
            )}
          />
          <ExtendedField mixes={["fieldset"]}>
            <Label
              htmlFor="isRentInPrice"
              label="czy cena zawiera czynsz dla administracji"
            />
            <Controller
              name="isRentInPrice"
              control={control}
              render={(
                { onChange, onBlur, value, name, ref },
                { invalid, isTouched, isDirty }
              ) => (
                <SelectField
                  value={value}
                  onChange={onChange}
                  options={isRentInPriceOptions}
                  widthSmall={true}
                  isSearchable={false}
                  name={name}
                  inputId={name}
                />
              )}
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
                  render={(
                    { onChange, onBlur, value, name, ref },
                    { invalid, isTouched, isDirty }
                  ) => (
                    <SelectField
                      value={value}
                      onChange={(option) => {
                        onChange(option);
                        clearErrors("numberOfFloors");
                        onBlur();
                      }}
                      options={floorAndNumberOfFloorsOptions}
                      widthSmall={true}
                      name={name}
                      inputId={name}
                      isRequired
                    />
                  )}
                />,
                <Controller
                  name="numberOfFloors"
                  control={control}
                  render={(
                    { onChange, onBlur, value, name, ref },
                    { invalid, isTouched, isDirty }
                  ) => (
                    <SelectField
                      value={value}
                      onChange={(option) => {
                        onChange(option);
                        clearErrors("floor");
                        onBlur();
                      }}
                      options={floorAndNumberOfFloorsOptions}
                      widthSmall={true}
                      name={name}
                      inputId={name}
                      isRequired
                    />
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
