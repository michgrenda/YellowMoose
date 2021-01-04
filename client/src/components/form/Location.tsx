import React, { useState, useEffect } from "react";
// Rifm
import { useRifm } from "rifm";
import { formatZIPCode, addZIPCodeMask } from "../../utils/validators";
// Components
import TextInput from "../TextInput";
import SelectInput from "../SelectInput";
// Types
import { OptionType } from "../../types";
import { ValueType } from "react-select";

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

// File interfaces
interface ILocationProps {
  setData: React.Dispatch<
    React.SetStateAction<{
      [index: string]: any;
    }>
  >;
}

interface IData {
  ZIPCode: string;
  voivodeship: ValueType<OptionType, false>;
}

// Props and default props
type Props = ILocationProps;

const Location: React.FC<Props> = (props) => {
  const { setData } = props;

  // States
  const [location, setLocation] = useState<IData>({
    ZIPCode: "",
    voivodeship: null,
  });

  // Update parent's state
  useEffect(() => {
    setData((prevState) => ({ ...prevState, ...location }));
  }, [setData, location]);

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
    <fieldset className="location">
      <header className="base-parameters__title">
        <h1 className="location__title-headline">Lokalizacja</h1>
      </header>
      <TextInput
        id="ZIPCode"
        name="ZIPCode"
        label="Kod pocztowy"
        value={ZIPCodeInput.value}
        onChange={ZIPCodeInput.onChange}
        information="Po wpisaniu poprawnego kodu pola lokalizacji uzupełnią się automatycznie."
        modifiers={["small"]}
        mixes={["location"]}
      />
      <SelectInput
        value={location.voivodeship}
        onChange={(option) =>
          setLocation((prevState) => ({
            ...prevState,
            voivodeship: option,
          }))
        }
        options={voivodeshipOptions}
        widthMedium={true}
        openMenuOnFocus={true}
        inputId="voivodeship"
        name="voivodeship"
        label="województwo"
        required
        mixes={["location"]}
      />
    </fieldset>
  );
};

export default Location;
