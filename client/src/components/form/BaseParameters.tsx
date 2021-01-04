import React, { useState, useEffect } from "react";
// Rifm
import { useRifm } from "rifm";
import {
  replaceDotWithComma,
  formatFloatingPointNumber,
  formatInteger,
  parseNumber,
  parseInteger,
} from "../../utils/validators";
// Components
import TextInput from "../TextInput";
import CheckboxInput from "../CheckboxInput";
import MultiInputs from "../MultiInputs";
import SelectInput from "../SelectInput";
// Types
import { OptionType } from "../../types";
import { ValueType } from "react-select";

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
const floorAndNumberOfFloorOptions = [...Array(floorNumber + 1)].map(
  (_, index) => ({
    value: String(index - 1),
    label: String(index - 1) || "parter",
  })
);

// File interfaces
interface IBaseParametersProps {
  setData: React.Dispatch<
    React.SetStateAction<{
      [index: string]: any;
    }>
  >;
}

interface IData {
  title: string;
  area: string;
  rooms: string;
  price: string;
  currency: ValueType<OptionType, false>;
  negotiable: boolean;
  isRentInPrice: ValueType<OptionType, false>;
  floor: ValueType<OptionType, false>;
  numberOfFloors: ValueType<OptionType, false>;
}

// Props and default props
type Props = IBaseParametersProps;

const BaseParameters: React.FC<Props> = (props) => {
  const { setData } = props;

  // States
  const [baseParameters, setBaseParameters] = useState<IData>({
    title: "",
    area: "",
    rooms: "",
    price: "",
    currency: { value: "PLN", label: "zł" },
    negotiable: false,
    isRentInPrice: null,
    floor: null,
    numberOfFloors: null,
  });

  // Update parent's state
  useEffect(() => {
    setData((prevState) => ({ ...prevState, ...baseParameters }));
  }, [setData, baseParameters]);

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

  // Handlers
  // -------------------------------------------------------------------
  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setBaseParameters((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const handleCheckboxInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setBaseParameters((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked,
    }));

  return (
    <fieldset className="base-parameters">
      <header className="base-parameters__title">
        <h1 className="base-parameters__title-headline">
          Informacje podstawowe
        </h1>
      </header>
      <TextInput
        id="title"
        name="title"
        label="tytuł"
        value={baseParameters.title}
        onChange={handleTextInputChange}
        required
        information="Możesz podać unikalne cechy nieruchomości, które zainteresują poszukujących."
        modifiers={["large"]}
        mixes={["base-parameters"]}
        maxLength={50}
      />
      <TextInput
        id="area"
        name="area"
        label="powierzchnia (m²)"
        value={areaInput.value}
        onChange={areaInput.onChange}
        required
        modifiers={["medium"]}
        mixes={["base-parameters"]}
        maxLength={10}
      />
      <TextInput
        id="rooms"
        name="rooms"
        label="liczba pokoi"
        value={roomsInput.value}
        onChange={roomsInput.onChange}
        required
        modifiers={["medium"]}
        mixes={["base-parameters"]}
        maxLength={10}
      />
      <MultiInputs
        labels={[{ label: "cena (czynsz)/mies.", htmlFor: "price" }]}
        inputs={[
          <TextInput
            id="price"
            name="price"
            value={priceInput.value}
            onChange={priceInput.onChange}
            required
            modifiers={["medium"]}
            maxLength={10}
          />,
          <SelectInput
            value={baseParameters.currency}
            onChange={(option) =>
              setBaseParameters((prevState) => ({
                ...prevState,
                currency: option,
              }))
            }
            defaultValue={baseParameters.currency}
            options={currencyOptions}
            widthExtraSmall={true}
            openMenuOnFocus={true}
            required
          />,
        ]}
        required
        mixes={["base-parameters"]}
      />
      <CheckboxInput
        id="negotiable"
        name="negotiable"
        label="cena do negocjacji"
        value="negotiable"
        checked={baseParameters.negotiable}
        onChange={handleCheckboxInputChange}
        mixes={["base-parameters"]}
      />
      <SelectInput
        value={baseParameters.isRentInPrice}
        onChange={(option) =>
          setBaseParameters((prevState) => ({
            ...prevState,
            isRentInPrice: option,
          }))
        }
        options={isRentInPriceOptions}
        widthSmall={true}
        isSearchable={false}
        openMenuOnFocus={true}
        inputId="isRentInPrice"
        name="isRentInPrice"
        label="czy cena zawiera czynsz dla administracji"
        mixes={["base-parameters"]}
      />
      <MultiInputs
        labels={[
          { label: "piętro", htmlFor: "floor" },
          { label: " liczba pięter", htmlFor: "numberOfFloors" },
        ]}
        inputs={[
          <SelectInput
            value={baseParameters.floor}
            onChange={(option) =>
              setBaseParameters((prevState) => ({
                ...prevState,
                floor: option,
              }))
            }
            options={floorAndNumberOfFloorOptions}
            widthSmall={true}
            isSearchable={false}
            openMenuOnFocus={true}
            inputId="floor"
            name="floor"
          />,
          <SelectInput
            value={baseParameters.numberOfFloors}
            onChange={(option) =>
              setBaseParameters((prevState) => ({
                ...prevState,
                numberOfFloors: option,
              }))
            }
            options={floorAndNumberOfFloorOptions}
            widthSmall={true}
            isSearchable={false}
            openMenuOnFocus={true}
            inputId="numberOfFloors"
            name="numberOfFloors"
          />,
        ]}
        required
        showSeparator
        mixes={["base-parameters"]}
      />
    </fieldset>
  );
};

export default BaseParameters;
