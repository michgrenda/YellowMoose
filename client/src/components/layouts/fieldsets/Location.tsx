import React, { HTMLAttributes } from "react";
// Rifm
import { useRifm } from "rifm";
import { formatZIPCode, addZIPCodeMask } from "../../../utils/rifm";
// Components
import { Fieldset } from "../../../components/form/Fieldset";
import { Label } from "../../../components/form/Label";
import { Field } from "../../../components/form/controls/Field";
import { ExtendedField } from "../../../components/form/controls/ExtendedField";
import { SelectField } from "../../..//components/form/controls/SelectField";
// Handlers
import { handleSelectChange } from "../../../utils/handlers";
// Types
import { LocationState } from "../forms/OfferForm";
import { FieldsetProps } from "../../../types";

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
    value: "świętkorzyskie",
    label: "świętkorzyskie",
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
type Props = FieldsetProps<LocationState> & HTMLAttributes<HTMLDivElement>;

export const Location = React.memo(
  ({ data: location, setData: setLocation, ...rest }: Props) => {
    // Rifm
    const ZIPCodeInput = useRifm({
      accept: /\d/g,
      mask: true,
      format: formatZIPCode,
      replace: addZIPCodeMask,
      value: location.ZIPCode,
      onChange: (value) =>
        setLocation((prevState) => ({
          ...prevState,
          ZIPCode: value,
        })),
    });

    return (
      <div className="location" {...rest}>
        <Fieldset title="lokalizacja" modifiers={["location"]}>
          <ExtendedField
            information="Po wpisaniu poprawnego kodu pola lokalizacji uzupełnią się automatycznie."
            mixes={["fieldset"]}
          >
            <Label htmlFor="ZIPCode" label="kod pocztowy" />
            <Field
              id="ZIPCode"
              name="ZIPCode"
              value={ZIPCodeInput.value}
              onChange={ZIPCodeInput.onChange}
              modifiers={["small"]}
            />
          </ExtendedField>
          <ExtendedField
            mixes={["fieldset"]}
            //   errors={locationErrors.voivodeshipIsValid}
          >
            <Label htmlFor="voivodeship" label="województwo" isRequired />
            <SelectField
              value={location.voivodeship}
              onChange={(option) =>
                handleSelectChange(option, setLocation, "voivodeship")
              }
              options={voivodeshipOptions}
              widthMedium={true}
              name="voivodeship"
              inputId="voivodeship"
              isRequired
            />
          </ExtendedField>
        </Fieldset>
      </div>
    );
  }
);
