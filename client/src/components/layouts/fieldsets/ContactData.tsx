import React, { HTMLAttributes } from "react";
// Rifm
import { useRifm } from "rifm";
import {
  formatCountryCode,
  formatPhone,
  parseDigits,
} from "../../../utils/rifm";
// Components
import { Fieldset } from "../../../components/form/Fieldset";
import { Label } from "../../../components/form/Label";
import { Field } from "../../../components/form/controls/Field";
import { ExtendedField } from "../../../components/form/controls/ExtendedField";
import { SelectField } from "../../..//components/form/controls/SelectField";
import { FieldsList } from "../../../components/form/FieldsList";
// Handlers
import { handleInputChange, handleSelectChange } from "../../../utils/handlers";
// Types
import { ContactDataState } from "../forms/OfferForm";
import { FieldsetProps } from "../../../types";

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
type Props = FieldsetProps<ContactDataState> & HTMLAttributes<HTMLDivElement>;

export const ContactData = React.memo(
  ({ data: contactData, setData: setContactData, ...rest }: Props) => {
    // Rifm
    const phoneNumberInput = useRifm({
      accept: /[\d ]/g,
      format: formatPhone,
      value: contactData.phoneNumber,
      onChange: (value) =>
        setContactData((prevState) => ({
          ...prevState,
          phoneNumber: parseDigits(value),
        })),
    });

    const countryCodeInput = useRifm({
      accept: /[\d+ ]/g,
      format: formatCountryCode,
      value: contactData.countryCode,
      onChange: (value) =>
        setContactData((prevState) => ({
          ...prevState,
          countryCode: parseDigits(value),
        })),
    });

    return (
      <div className="contact-data" {...rest}>
        <Fieldset title="informacje podstawowe" modifiers={["contact-data"]}>
          <ExtendedField
            mixes={["fieldset"]}
            //   errors={contactDataErrors.firstnameIsValid}
          >
            <Label htmlFor="firstname" label="imię" isRequired />
            <Field
              id="firstname"
              name="firstname"
              value={contactData.firstname}
              onChange={(e) => handleInputChange(e, setContactData)}
              required
              modifiers={["medium"]}
              maxLength={25}
            />
          </ExtendedField>
          <ExtendedField
            mixes={["fieldset"]}
            //   errors={contactDataErrors.emailIsValid}
          >
            <Label htmlFor="email" label="twój adres e-mail" isRequired />
            <Field
              id="email"
              name="email"
              value={contactData.email}
              onChange={(e) => handleInputChange(e, setContactData)}
              required
              modifiers={["medium"]}
              maxLength={25}
            />
          </ExtendedField>
          <ExtendedField
            mixes={["fieldset"]}
            //   errors={contactDataErrors.phoneNumberIsValid}
          >
            <Label
              htmlFor="phoneNumber"
              label="telefon kontaktowy"
              isRequired
            />
            <FieldsList
              inputs={[
                <Field
                  id="countryCode"
                  name="countryCode"
                  value={countryCodeInput.value}
                  onChange={countryCodeInput.onChange}
                  required
                  modifiers={["extra-small"]}
                />,
                <Field
                  id="phoneNumber"
                  name="phoneNumber"
                  value={phoneNumberInput.value}
                  onChange={phoneNumberInput.onChange}
                  required
                  modifiers={["medium"]}
                />,
              ]}
            />
          </ExtendedField>
          <ExtendedField
            mixes={["fieldset"]}
            //   errors={contactDataErrors.ownerTypeIsValid}
          >
            <Label htmlFor="ownerType" label="zgłoszenie wysyła" isRequired />
            <SelectField
              value={contactData.ownerType}
              onChange={(option) =>
                handleSelectChange(option, setContactData, "ownerType")
              }
              options={ownerTypeOptions}
              widthLarge={true}
              name="ownerType"
              inputId="ownerType"
              isRequired
            />
          </ExtendedField>
        </Fieldset>
      </div>
    );
  }
);
