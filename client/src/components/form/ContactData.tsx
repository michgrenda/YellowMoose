import React, { useState, useEffect } from "react";
// Rifm
import { useRifm } from "rifm";
import {
  parseDigits,
  formatPhone,
  formatCountryCode,
} from "../../utils/validators";
// Components
import TextInput from "../TextInput";
import SelectInput from "../SelectInput";
import MultiInputs from "../MultiInputs";
// Types
import { OptionType } from "../../types";
import { ValueType } from "react-select";

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

// File interfaces
interface IContactDataProps {
  setData: React.Dispatch<
    React.SetStateAction<{
      [index: string]: any;
    }>
  >;
}

interface IData {
  firstname: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  ownerType: ValueType<OptionType, false>;
}

// Props and default props
type Props = IContactDataProps;

const ContactData: React.FC<Props> = (props) => {
  const { setData } = props;

  // States
  const [contactData, setContactData] = useState<IData>({
    firstname: "",
    email: "",
    phoneNumber: "",
    countryCode: "48",
    ownerType: null,
  });

  // Update parent's state
  useEffect(() => {
    setData((prevState) => ({ ...prevState, ...contactData }));
  }, [setData, contactData]);

  // Rifm
  const phoneInput = useRifm({
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

  // Handlers
  // -------------------------------------------------------------------
  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContactData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  return (
    <fieldset className="contact-data">
      <header className="contact-data__title">
        <h1 className="contact-data__title-headline">Dane kontaktowe</h1>
      </header>
      <TextInput
        id="firstname"
        name="firstname"
        label="imię"
        value={contactData.firstname}
        onChange={handleTextInputChange}
        required
        modifiers={["medium"]}
        mixes={["contact-data"]}
        maxLength={25}
      />
      <TextInput
        id="email"
        name="email"
        label="twój adres e-mail"
        value={contactData.email}
        onChange={handleTextInputChange}
        required
        modifiers={["medium"]}
        mixes={["contact-data"]}
        maxLength={25}
      />
      <MultiInputs
        labels={[{ label: "telefon kontaktowy", htmlFor: "phoneNumber" }]}
        inputs={[
          <TextInput
            id="countryCode"
            name="countryCode"
            value={countryCodeInput.value}
            onChange={countryCodeInput.onChange}
            required
            modifiers={["extra-small"]}
          />,
          <TextInput
            id="phoneNumber"
            name="phoneNumber"
            value={phoneInput.value}
            onChange={phoneInput.onChange}
            required
            modifiers={["medium"]}
          />,
        ]}
        required
        mixes={["contact-data"]}
      />
      <SelectInput
        value={contactData.ownerType}
        onChange={(option) =>
          setContactData((prevState) => ({
            ...prevState,
            ownerType: option,
          }))
        }
        options={ownerTypeOptions}
        widthLarge={true}
        openMenuOnFocus={true}
        inputId="ownerType"
        name="ownerType"
        label="zgłoszenie wysyła"
        required
        mixes={["contact-data"]}
      />
    </fieldset>
  );
};

export default ContactData;
