import React, { useState, useEffect } from "react";
// Rifm
import { useRifm } from "rifm";
import {
  replaceDotWithComma,
  addDateMask,
  parseInteger,
  parseNumber,
  formatInteger,
  formatFloatingPointNumber,
  formatDate,
} from "../../utils/validators";
// Components
import TextInput from "../TextInput";
import SelectInput from "../SelectInput";
import CheckboxInput from "../CheckboxInput";
// Types
import { OptionType } from "../../types";
import { ValueType } from "react-select";

// Options
const buildingTypeOptions = [
  { value: "apartamentowiec", label: "apartamentowiec" },
  {
    value: "blok",
    label: "blok",
  },
  { value: "dom wielorodzinny", label: "dom wielorodzinny" },
  { value: "kamienica", label: "kamienica" },
];

const conditionOptions = [
  { value: "bardzo dobry", label: "bardzo dobry" },
  {
    value: "dobry",
    label: "dobry",
  },
  { value: "do odświeżenia", label: "do odświeżenia" },
  { value: "do remontu", label: "do remontu" },
  {
    value: "bez białego montażu i podłóg",
    label: "bez białego montażu i podłóg",
  },
  { value: "do wykończenia", label: "do wykończenia" },
  { value: "wysoki standard", label: "wysoki standard" },
];

const levelNumber = 5;
const levelOptions = [...Array(levelNumber + 1)].map((_, index) => ({
  value: String(index + 1),
  label: String(index + 1),
}));

const kitchenTypeOptions = [
  { value: "aneks", label: "aneks" },
  { value: "wnęka", label: "wnęka" },
  { value: "brak", label: "brak" },
  { value: "otwarta", label: "otwarta" },
  { value: "półotwarta", label: "półotwarta" },
  { value: "osobna", label: "osobna" },
];

const isBathroomWithWCOptions = [
  { value: "razem", label: "razem" },
  { value: "osobno", label: "osobno" },
];

const hasBalconyOptions = [
  { value: "tak", label: "tak" },
  { value: "nie", label: "nie" },
];

const hasTerraceOptions = [
  { value: "tak", label: "tak" },
  { value: "nie", label: "nie" },
];

const hasElevatorOptions = [
  { value: "tak", label: "tak" },
  { value: "nie", label: "nie" },
];

const heatingOptions = [
  { value: "miejskie", label: "miejskie" },
  { value: "biomasa", label: "biomasa" },
  { value: "geotermika", label: "geotermika" },
  { value: "podłogowe", label: "podłogowe" },
  { value: "klimatyzacja", label: "klimatyzacja" },
  { value: "brak", label: "brak" },
  { value: "kominkowe", label: "kominkowe" },
  { value: "słoneczne", label: "słoneczne" },
  { value: "węglowe", label: "węglowe" },
  { value: "olejowe", label: "olejowe" },
  { value: "elektryczne", label: "elektryczne" },
  { value: "gazowe", label: "gazowe" },
  { value: "zróżnicowane", label: "zróżnicowane" },
];

const parkingPlaceOptions = [
  { value: "brak", label: "brak" },
  { value: "garaż", label: "garaż" },
  { value: "na ulicy", label: "na ulicy" },
  { value: "parking podziemny", label: "parking podziemny" },
  { value: "parking naziemny", label: "parking naziemny" },
];

// Checkbox inputs
const facilities = [
  { name: "hasAirConditioning", label: "klimatyzacja" },
  { name: "kitchenIsFurnished", label: "kuchnia umeblowana" },
  { name: "hasBasement", label: "piwnica" },
  { name: "hasIntercom", label: "domofon" },
  { name: "hasFridge", label: "lodówka" },
  { name: "hasTVSet", label: "telewizor" },
  { name: "hasFurniture", label: "umeblowane" },
  { name: "hasAttic", label: "poddasze" },
  { name: "hasGasOven", label: "piecyk gazowy" },
  { name: "hasGarden", label: "ogródek" },
  { name: "hasWashingMachine", label: "pralka" },
  { name: "closedComplex", label: "osiedle zamknięte" },
];

const media = [
  { name: "hasGas", label: "gaz" },
  { name: "hasInternet", label: "internet" },
  { name: "hasPhone", label: "telefon" },
];

// File interfaces
interface IDetailsProps {
  setData: React.Dispatch<
    React.SetStateAction<{
      [index: string]: any;
    }>
  >;
}

interface IData {
  constructionYear: string;
  buildingType: ValueType<OptionType, false>;
  condition: ValueType<OptionType, false>;
  level: ValueType<OptionType, false>;
  kitchenType: ValueType<OptionType, false>;
  isBathroomWithWC: ValueType<OptionType, false>;
  insideHeight: string;
  energyDemand: string;
  heating: ValueType<OptionType, false>;
  parkingPlace: ValueType<OptionType, false>;
  hasBalcony: ValueType<OptionType, false>;
  hasTerrace: ValueType<OptionType, false>;
  hasElevator: ValueType<OptionType, false>;
  firstOwner: boolean;
  vacatedFrom: string;
  facilities: { [index: string]: boolean };
  media: { [index: string]: boolean };
}

// Props and default props
type Props = IDetailsProps;

const Details: React.FC<Props> = (props) => {
  const { setData } = props;

  // States
  const [details, setDetails] = useState<IData>({
    constructionYear: "",
    buildingType: null,
    condition: null,
    level: null,
    kitchenType: null,
    isBathroomWithWC: null,
    insideHeight: "",
    energyDemand: "",
    heating: null,
    parkingPlace: null,
    hasBalcony: null,
    hasTerrace: null,
    hasElevator: null,
    firstOwner: false,
    vacatedFrom: "",
    facilities: {},
    media: {},
  });
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Update parent's state
  useEffect(() => {
    setData((prevState) => ({ ...prevState, ...details }));
  }, [setData, details]);

  // Rifm
  const constructionYearInput = useRifm({
    accept: /\d/g,
    format: formatInteger,
    value: details.constructionYear,
    onChange: (value) =>
      setDetails((prevState) => ({
        ...prevState,
        constructionYear: parseInteger(value),
      })),
  });

  const insideHeightInput = useRifm({
    accept: /[\d.,]/g,
    format: (v) => formatFloatingPointNumber(v, 1),
    replace: replaceDotWithComma,
    value: details.insideHeight,
    onChange: (value) =>
      setDetails((prevState) => ({
        ...prevState,
        insideHeight: parseNumber(value),
      })),
  });

  const energyDemandInput = useRifm({
    accept: /[\d.,]/g,
    format: (v) => formatFloatingPointNumber(v, 3),
    replace: replaceDotWithComma,
    value: details.energyDemand,
    onChange: (value) =>
      setDetails((prevState) => ({
        ...prevState,
        energyDemand: parseNumber(value),
      })),
  });

  const vacatedFromInput = useRifm({
    accept: /\d/g,
    mask: true,
    format: formatDate,
    replace: addDateMask,
    value: details.vacatedFrom,
    onChange: (value) =>
      setDetails((prevState) => ({
        ...prevState,
        vacatedFrom: value,
      })),
  });

  // Handlers
  // -------------------------------------------------------------------
  // Toggle fieldset
  const handleTitleClick = () => setIsExpanded((prevState) => !prevState);

  const handleCheckboxInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked,
    }));

  // Variables
  const facilitiesCheckboxInputs = facilities.map((data) => (
    <CheckboxInput
      id={data.name}
      name={data.name}
      label={data.label}
      value={data.name}
      checked={details.facilities && details.facilities[data.name]}
      onChange={(e) =>
        setDetails((prevState) => ({
          ...prevState,
          facilities: {
            ...prevState.facilities,
            [e.target.name]: e.target.checked,
          },
        }))
      }
      modifiers={["display-block"]}
      mixes={["details"]}
      key={data.name}
    />
  ));

  const mediaCheckboxInputs = media.map((data) => (
    <CheckboxInput
      id={data.name}
      name={data.name}
      label={data.label}
      value={data.name}
      checked={details.media && details.media[data.name]}
      onChange={(e) =>
        setDetails((prevState) => ({
          ...prevState,
          media: { ...prevState.media, [e.target.name]: e.target.checked },
        }))
      }
      modifiers={["display-block"]}
      mixes={["details"]}
      key={data.name}
    />
  ));

  // Equal parts
  const n = 3;

  return (
    <fieldset className={`details ${isExpanded && "details--is-expanded"}`}>
      <header className="details__title">
        <h1 className="details__title-headline" onClick={handleTitleClick}>
          Szczegółowe informacje{" "}
          {!isExpanded && (
            <span className="details__expandable-info">
              - kliknij aby rozwinąć
            </span>
          )}
        </h1>
      </header>
      <div className="details__inputs-wrapper">
        <TextInput
          id="constructionYear"
          name="constructionYear"
          label="rok budowy"
          value={constructionYearInput.value}
          onChange={constructionYearInput.onChange}
          modifiers={["medium"]}
          mixes={["details"]}
          maxLength={4}
        />
        <SelectInput
          value={details.buildingType}
          onChange={(option) =>
            setDetails((prevState) => ({
              ...prevState,
              buildingType: option,
            }))
          }
          components={{}}
          isClearable={true}
          options={buildingTypeOptions}
          widthMedium={true}
          openMenuOnFocus={true}
          inputId="buildingType"
          name="buildingType"
          label="typ budynku"
          mixes={["details"]}
        />
        <SelectInput
          value={details.condition}
          onChange={(option) =>
            setDetails((prevState) => ({
              ...prevState,
              condition: option,
            }))
          }
          components={{}}
          isClearable={true}
          options={conditionOptions}
          widthMedium={true}
          openMenuOnFocus={true}
          inputId="condition"
          name="condition"
          label="stan mieszkania"
          mixes={["details"]}
        />
        <SelectInput
          value={details.level}
          onChange={(option) =>
            setDetails((prevState) => ({
              ...prevState,
              level: option,
            }))
          }
          components={{}}
          isClearable={true}
          options={levelOptions}
          widthMedium={true}
          openMenuOnFocus={true}
          inputId="level"
          name="level"
          label="liczba poziomów"
          mixes={["details"]}
        />
        <SelectInput
          value={details.kitchenType}
          onChange={(option) =>
            setDetails((prevState) => ({
              ...prevState,
              kitchenType: option,
            }))
          }
          components={{}}
          isClearable={true}
          options={kitchenTypeOptions}
          widthMedium={true}
          openMenuOnFocus={true}
          inputId="kitchenType"
          name="kitchenType"
          label="typ kuchni"
          mixes={["details"]}
        />
        <SelectInput
          value={details.isBathroomWithWC}
          onChange={(option) =>
            setDetails((prevState) => ({
              ...prevState,
              isBathroomWithWC: option,
            }))
          }
          components={{}}
          isClearable={true}
          options={isBathroomWithWCOptions}
          widthMedium={true}
          openMenuOnFocus={true}
          inputId="isBathroomWithWC"
          name="isBathroomWithWC"
          label="łazienka i WC"
          mixes={["details"]}
        />
        <TextInput
          id="insideHeight"
          name="insideHeight"
          label="wysokość pomieszczeń (cm)"
          value={insideHeightInput.value}
          onChange={insideHeightInput.onChange}
          modifiers={["medium"]}
          mixes={["details"]}
          maxLength={10}
        />
        <TextInput
          id="energyDemand"
          name="energyDemand"
          label="zapotrzebowanie energetyczne (kWh/(m²·rok))"
          value={energyDemandInput.value}
          onChange={energyDemandInput.onChange}
          modifiers={["medium"]}
          mixes={["details"]}
          maxLength={10}
        />
        <SelectInput
          value={details.heating}
          onChange={(option) =>
            setDetails((prevState) => ({
              ...prevState,
              heating: option,
            }))
          }
          components={{}}
          isClearable={true}
          options={heatingOptions}
          widthMedium={true}
          openMenuOnFocus={true}
          inputId="heating"
          name="heating"
          label="ogrzewanie"
          mixes={["details"]}
        />
        <SelectInput
          value={details.parkingPlace}
          onChange={(option) =>
            setDetails((prevState) => ({
              ...prevState,
              parkingPlace: option,
            }))
          }
          components={{}}
          isClearable={true}
          options={parkingPlaceOptions}
          widthMedium={true}
          openMenuOnFocus={true}
          inputId="parkingPlace"
          name="parkingPlace"
          label="miejsce parkingowe"
          mixes={["details"]}
        />
        <SelectInput
          value={details.hasBalcony}
          onChange={(option) =>
            setDetails((prevState) => ({
              ...prevState,
              hasBalcony: option,
            }))
          }
          components={{}}
          isClearable={true}
          options={hasBalconyOptions}
          widthMedium={true}
          openMenuOnFocus={true}
          inputId="hasBalcony"
          name="hasbalcony"
          label="balkon"
          mixes={["details"]}
        />
        <SelectInput
          value={details.hasTerrace}
          onChange={(option) =>
            setDetails((prevState) => ({
              ...prevState,
              hasTerrace: option,
            }))
          }
          components={{}}
          isClearable={true}
          options={hasTerraceOptions}
          widthMedium={true}
          openMenuOnFocus={true}
          inputId="hasTerrace"
          name="hasTerrace"
          label="taras"
          mixes={["details"]}
        />
        <SelectInput
          value={details.hasElevator}
          onChange={(option) =>
            setDetails((prevState) => ({
              ...prevState,
              hasElevator: option,
            }))
          }
          components={{}}
          isClearable={true}
          options={hasElevatorOptions}
          widthMedium={true}
          openMenuOnFocus={true}
          inputId="hasElevator"
          name="hasElevator"
          label="winda"
          mixes={["details"]}
        />
        <CheckboxInput
          id="firstOwner"
          name="firstOwner"
          label="oferta z rynku pierwotnego"
          value="firstOwner"
          checked={details.firstOwner}
          onChange={handleCheckboxInputChange}
          mixes={["details"]}
        />
        <TextInput
          id="vacatedFrom"
          name="vacatedFrom"
          label="dostępne od"
          value={vacatedFromInput.value}
          onChange={vacatedFromInput.onChange}
          modifiers={["medium"]}
          mixes={["details"]}
        />
        <div className="checkboxes-container">
          <div className="checkboxes-container__label-wrapper">
            <span className="checkboxes-container__label">udogodnienia</span>
          </div>
          <div className="checkboxes-container__row">
            {new Array(Math.ceil(facilitiesCheckboxInputs.length / n))
              .fill(0)
              .map((_, index) => (
                <div className="checkboxes-container__col" key={index}>
                  {facilitiesCheckboxInputs.splice(0, n)}
                </div>
              ))}
          </div>
        </div>
        <div className="checkboxes-container">
          <div className="checkboxes-container__label-wrapper">
            <span className="checkboxes-container__label">media</span>
          </div>
          <div className="checkboxes-container__row">
            {new Array(Math.ceil(mediaCheckboxInputs.length / n))
              .fill(0)
              .map((_, index) => (
                <div className="checkboxes-container__col" key={index}>
                  {mediaCheckboxInputs.splice(0, n)}
                </div>
              ))}
          </div>
        </div>
      </div>
    </fieldset>
  );
};

export default Details;
