import React, { useCallback, useEffect, HTMLAttributes } from "react";
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
// Types
import { ControlReactHookForm, FieldsetWithErrors } from "../../../ts/types";
// axios
import { geocodingAPI } from "../../../utils/axios";

// Options
const voivodeshipOptions = [
  { value: "dolnośląskie", label: "dolnośląskie" },
  {
    value: "kujawsko-pomorskie",
    label: "kujawsko-pomorskie",
  },
  { value: "lubelskie", label: "lubelskie" },
  { value: "lubuskie", label: "lubuskie" },
  { value: "łódzkie", label: "łódzkie" },
  { value: "małopolskie", label: "małopolskie" },
  { value: "mazowieckie", label: "mazowieckie" },
  { value: "opolskie", label: "opolskie" },
  { value: "podkarpackie", label: "podkarpackie" },
  { value: "podlaskie", label: "podlaskie" },
  { value: "pomorskie", label: "pomorskie" },
  { value: "śląskie", label: "śląskie" },
  {
    value: "świętokrzyskie",
    label: "świętokrzyskie",
  },
  {
    value: "warmińsko-mazurskie",
    label: "warmińsko-mazurskie",
  },
  { value: "wielkopolskie", label: "wielkopolskie" },
  {
    value: "zachodniopomorskie",
    label: "zachodniopomorskie",
  },
];

// Props and default props
type Props = HTMLAttributes<HTMLDivElement> &
  ControlReactHookForm &
  FieldsetWithErrors;

export const Location = React.memo(
  ({ register, control, errors, setValue, watch, ...rest }: Props) => {
    // Methods
    // -------------------------------------------------------------------
    const autoCompleteVoivodeship = useCallback(
      async (
        searchText: string,
        endpoint: "mapbox.places" | "mapbox.places-permanent" = "mapbox.places"
      ) => {
        try {
          const geocodingData = await geocodingAPI.get(
            `/${endpoint}/${searchText}.json`,
            {
              params: {
                contry: "PL",
                language: "pl",
                types: "postcode",
              },
            }
          );

          // Get voivodeship
          const voivodeship = geocodingData.data.features[0].context
            .filter(
              (value: { [index: string]: any }) =>
                value.id.indexOf("region") >= 0
            )[0]
            .text.split(" ")[1];

          setValue("voivodeship", { value: voivodeship, label: voivodeship });
        } catch (error) {
          // Exception handling
        }
      },
      [setValue]
    );

    // Variables
    const voivodeship = watch("voivodeship", false);
    const postcode = watch("postcode", false);

    // Autocomplete voivodeship if postcode is set
    useEffect(() => {
      const rePostcode = /^\d{2}-\d{3}$/;

      if (rePostcode.test(postcode)) autoCompleteVoivodeship(postcode);
    }, [postcode, autoCompleteVoivodeship]);

    return (
      <div className="location" {...rest}>
        <Fieldset title="lokalizacja" modifiers={["location"]}>
          <ExtendedField
            information="Po wpisaniu poprawnego kodu pola lokalizacji uzupełnią się automatycznie."
            mixes={["fieldset"]}
          >
            <Label htmlFor="postcode" label="kod pocztowy" />
            <Field
              modifiers={["small"]}
              render={(className: string) => (
                <Controller
                  as={NumberFormat}
                  format="##-###"
                  mask="_"
                  allowEmptyFormatting
                  id="postcode"
                  name="postcode"
                  required
                  control={control}
                  className={className}
                />
              )}
            />
          </ExtendedField>
          <ExtendedField
            mixes={["fieldset"]}
            errorMessages={[errors.voivodeship?.value?.message]}
          >
            <Label htmlFor="voivodeship" label="województwo" isRequired />
            <Controller
              name="voivodeship"
              control={control}
              render={(
                { onChange, onBlur, value, name, ref },
                { invalid, isTouched, isDirty }
              ) => (
                <SelectField
                  value={value}
                  onChange={onChange}
                  options={voivodeshipOptions}
                  widthMedium={true}
                  name={name}
                  inputId={name}
                  isRequired
                />
              )}
            />
          </ExtendedField>
          {voivodeship && (
            <>
              <ExtendedField mixes={["fieldset"]}>
                <Label htmlFor="street" label="ulica" />
                <Field
                  id="street"
                  name="street"
                  modifiers={["medium"]}
                  register={register}
                />
              </ExtendedField>
              <ExtendedField mixes={["fieldset"]}>
                <Label htmlFor="locationNumber" label="numer budynku" />
                <Field
                  id="locationNumber"
                  name="locationNumber"
                  modifiers={["medium"]}
                  register={register}
                />
              </ExtendedField>
            </>
          )}
        </Fieldset>
      </div>
    );
  }
);
