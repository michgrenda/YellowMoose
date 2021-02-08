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
import { FieldsList } from "../../../components/forms/FieldsList";
// Types
import { ControlReactHookForm, FieldsetWithErrors } from "../../../ts/types";

// Options
const ownerTypeOptions = [
  {
    value: "właściciel (osoba prywatna)",
    label: "właściciel (osoba prywatna)",
  },
  {
    value: "właściciel (firma)",
    label: "właściciel (firma)",
  },
  { value: "deweloper", label: "deweloper" },
  { value: "pośrednik", label: "pośrednik" },
];

// Props and default props
type Props = HTMLAttributes<HTMLDivElement> &
  ControlReactHookForm &
  FieldsetWithErrors;

export const ContactData = React.memo(
  ({ register, control, errors, watch, ...rest }: Props) => {
    return (
      <div className="contact-data" {...rest}>
        <Fieldset title="informacje podstawowe" modifiers={["contact-data"]}>
          <ExtendedField
            mixes={["fieldset"]}
            errorMessages={[errors.firstname?.message]}
          >
            <Label htmlFor="firstname" label="imię" isRequired />
            <Field
              id="firstname"
              name="firstname"
              required
              modifiers={["medium"]}
              register={register}
            />
          </ExtendedField>
          <ExtendedField
            mixes={["fieldset"]}
            errorMessages={[errors.email?.message]}
          >
            <Label htmlFor="email" label="twój adres e-mail" isRequired />
            <Field
              id="email"
              name="email"
              required
              modifiers={["medium"]}
              register={register}
            />
          </ExtendedField>
          <ExtendedField
            mixes={["fieldset"]}
            errorMessages={[
              errors.dialCode?.message,
              errors.phoneNumber?.message,
            ]}
          >
            <Label
              htmlFor="phoneNumber"
              label="telefon kontaktowy"
              isRequired
            />
            <FieldsList
              inputs={[
                <Field
                  modifiers={["extra-small"]}
                  render={(className: string) => (
                    <Controller
                      as={NumberFormat}
                      thousandSeparator=""
                      decimalScale={0}
                      prefix="+"
                      allowEmptyFormatting
                      allowNegative={false}
                      id="dialCode"
                      name="dialCode"
                      defaultValue="+48"
                      required
                      control={control}
                      className={className}
                    />
                  )}
                />,
                <Field
                  modifiers={["medium"]}
                  render={(className: string) => (
                    <Controller
                      as={NumberFormat}
                      thousandSeparator=""
                      decimalScale={0}
                      allowNegative={false}
                      id="phoneNumber"
                      name="phoneNumber"
                      required
                      control={control}
                      className={className}
                    />
                  )}
                />,
              ]}
            />
          </ExtendedField>
          <ExtendedField
            mixes={["fieldset"]}
            errorMessages={[errors.ownerType?.value?.message]}
          >
            <Label htmlFor="ownerType" label="zgłoszenie wysyła" isRequired />
            <Controller
              name="ownerType"
              control={control}
              render={(
                { onChange, onBlur, value, name, ref },
                { invalid, isTouched, isDirty }
              ) => (
                <SelectField
                  value={value}
                  onChange={onChange}
                  options={ownerTypeOptions}
                  widthLarge={true}
                  name={name}
                  inputId={name}
                  isRequired
                />
              )}
            />
          </ExtendedField>
        </Fieldset>
      </div>
    );
  }
);
