import React, { HTMLAttributes } from "react";
// Rifm
import { useRifm } from "rifm";
import {
  replaceDotWithComma,
  formatFloatingPointNumber,
  formatInteger,
  formatDate,
  parseNumber,
  parseInteger,
  addDateMask,
} from "../../../utils/rifm";
// Components
import { Fieldset } from "../../../components/form/Fieldset";
import { Label } from "../../../components/form/Label";
import { Field } from "../../../components/form/controls/Field";
import { ExtendedField } from "../../../components/form/controls/ExtendedField";
import { SelectField } from "../../../components/form/controls/SelectField";
import { Control } from "../../../components/form/controls/Control";
import { ControlsList } from "../../../components/form/ControlsList";
// Handlers
import { handleInputChange, handleSelectChange } from "../../../utils/handlers";
// Types
import { DetailsState } from "../forms/OfferForm";
import { FieldsetProps } from "../../../types";

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

// Data
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

// Props and default props
type Props = FieldsetProps<DetailsState> & HTMLAttributes<HTMLDivElement>;

export const Details = React.memo(
  ({ data: details, setData: setDetails, ...rest }: Props) => {
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

    // Variables
    const facilitiesControls = facilities.map((data) => (
      <Control
        id={data.name}
        name={data.name}
        label={data.label}
        value={data.name}
        checked={details.facilities[data.name]}
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
        mixes={["fieldset"]}
        key={data.name}
      />
    ));

    const mediaControls = media.map((data) => (
      <Control
        id={data.name}
        name={data.name}
        label={data.label}
        value={data.name}
        checked={details.media[data.name]}
        onChange={(e) =>
          setDetails((prevState) => ({
            ...prevState,
            media: { ...prevState.media, [e.target.name]: e.target.checked },
          }))
        }
        modifiers={["display-block"]}
        mixes={["fieldset"]}
        key={data.name}
      />
    ));

    return (
      <div className="details" {...rest}>
        <Fieldset
          title="szczegółowe informacje"
          isExpandable
          modifiers={["details"]}
        >
          <ExtendedField mixes={["fieldset"]}>
            <Label htmlFor="constructionYear" label="rok budowy" />
            <Field
              id="constructionYear"
              name="constructionYear"
              value={constructionYearInput.value}
              onChange={constructionYearInput.onChange}
              modifiers={["medium"]}
              maxLength={4}
            />
          </ExtendedField>
          <ExtendedField mixes={["fieldset"]}>
            <Label htmlFor="buildingType" label="zgłoszenie wysyła" />
            <SelectField
              value={details.buildingType}
              onChange={(option) =>
                handleSelectChange(option, setDetails, "buildingType")
              }
              isClearable={true}
              options={buildingTypeOptions}
              widthMedium={true}
              name="buildingType"
              inputId="buildingType"
            />
          </ExtendedField>
          <ExtendedField mixes={["fieldset"]}>
            <Label htmlFor="condition" label="stan mieszkania" />
            <SelectField
              value={details.condition}
              onChange={(option) =>
                handleSelectChange(option, setDetails, "condition")
              }
              isClearable={true}
              options={conditionOptions}
              widthMedium={true}
              name="condition"
              inputId="condition"
            />
          </ExtendedField>
          <ExtendedField mixes={["fieldset"]}>
            <Label htmlFor="level" label="liczba poziomów" />
            <SelectField
              value={details.level}
              onChange={(option) =>
                handleSelectChange(option, setDetails, "level")
              }
              isClearable={true}
              options={levelOptions}
              widthMedium={true}
              name="level"
              inputId="level"
            />
          </ExtendedField>
          <ExtendedField mixes={["fieldset"]}>
            <Label htmlFor="kitchenType" label="typ kuchni" />
            <SelectField
              value={details.kitchenType}
              onChange={(option) =>
                handleSelectChange(option, setDetails, "kitchenType")
              }
              isClearable={true}
              options={kitchenTypeOptions}
              widthMedium={true}
              name="kitchenType"
              inputId="kitchenType"
            />
          </ExtendedField>
          <ExtendedField mixes={["fieldset"]}>
            <Label htmlFor="isBathroomWithWC" label="łazienka i WC" />
            <SelectField
              value={details.isBathroomWithWC}
              onChange={(option) =>
                handleSelectChange(option, setDetails, "isBathroomWithWC")
              }
              isClearable={true}
              options={isBathroomWithWCOptions}
              widthMedium={true}
              name="isBathroomWithWC"
              inputId="isBathroomWithWC"
            />
          </ExtendedField>
          <ExtendedField mixes={["fieldset"]}>
            <Label htmlFor="insideHeight" label="wysokość pomieszczeń" />
            <Field
              id="insideHeight"
              name="insideHeight"
              value={insideHeightInput.value}
              onChange={insideHeightInput.onChange}
              modifiers={["medium"]}
              maxLength={10}
            />
          </ExtendedField>
          <ExtendedField mixes={["fieldset"]}>
            <Label
              htmlFor="energyDemand"
              label="zapotrzebowanie energetyczne (kWh/(m²·rok))"
            />
            <Field
              id="energyDemand"
              name="energyDemand"
              value={energyDemandInput.value}
              onChange={energyDemandInput.onChange}
              modifiers={["medium"]}
              maxLength={10}
            />
          </ExtendedField>
          <ExtendedField mixes={["fieldset"]}>
            <Label htmlFor="heating" label="ogrzewanie" />
            <SelectField
              value={details.heating}
              onChange={(option) =>
                handleSelectChange(option, setDetails, "heating")
              }
              isClearable={true}
              options={heatingOptions}
              widthMedium={true}
              name="heating"
              inputId="heating"
            />
          </ExtendedField>
          <ExtendedField mixes={["fieldset"]}>
            <Label htmlFor="parkingPlace" label="miejsce parkingowe" />
            <SelectField
              value={details.parkingPlace}
              onChange={(option) =>
                handleSelectChange(option, setDetails, "parkingPlace")
              }
              isClearable={true}
              options={parkingPlaceOptions}
              widthMedium={true}
              name="parkingPlace"
              inputId="parkingPlace"
            />
          </ExtendedField>
          <ExtendedField mixes={["fieldset"]}>
            <Label htmlFor="hasbalcony" label="balkon" />
            <SelectField
              value={details.hasBalcony}
              onChange={(option) =>
                handleSelectChange(option, setDetails, "hasBalcony")
              }
              isClearable={true}
              options={hasBalconyOptions}
              widthMedium={true}
              name="hasbalcony"
              inputId="hasBalcony"
            />
          </ExtendedField>
          <ExtendedField mixes={["fieldset"]}>
            <Label htmlFor="hasTerrace" label="taras" />
            <SelectField
              value={details.hasTerrace}
              onChange={(option) =>
                handleSelectChange(option, setDetails, "hasTerrace")
              }
              isClearable={true}
              options={hasTerraceOptions}
              widthMedium={true}
              name="hasTerrace"
              inputId="hasTerrace"
            />
          </ExtendedField>
          <ExtendedField mixes={["fieldset"]}>
            <Label htmlFor="hasElevator" label="winda" />
            <SelectField
              value={details.hasElevator}
              onChange={(option) =>
                handleSelectChange(option, setDetails, "hasElevator")
              }
              isClearable={true}
              options={hasElevatorOptions}
              widthMedium={true}
              inputId="hasElevator"
              name="hasElevator"
            />
          </ExtendedField>
          <Control
            id="firstOwner"
            name="firstOwner"
            label="oferta z rynku pierwotnego"
            value="firstOwner"
            checked={details.firstOwner}
            onChange={(e) => handleInputChange(e, setDetails)}
            mixes={["fieldset"]}
          />
          <ExtendedField mixes={["fieldset"]}>
            <Label htmlFor="vacatedFrom" label="dostępne od" />
            <Field
              id="vacatedFrom"
              name="vacatedFrom"
              value={vacatedFromInput.value}
              onChange={vacatedFromInput.onChange}
              modifiers={["medium"]}
            />
          </ExtendedField>
          <ExtendedField>
            <Label label="udogodnienia" />
            <ControlsList inputs={facilitiesControls} n={3} />
          </ExtendedField>
          <ExtendedField>
            <Label label="media" />
            <ControlsList inputs={mediaControls} n={3} />
          </ExtendedField>
        </Fieldset>
      </div>
    );
  }
);
