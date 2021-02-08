import React, { useState, HTMLAttributes } from "react";
// React-number-format
import NumberFormat from "react-number-format";
// React-hook-form
import { Controller } from "react-hook-form";
// Components
import { Fieldset } from "../../../components/forms/Fieldset";
import { Label } from "../../../components/forms/Label";
import { Field } from "../../../components/forms/controls/Field";
import { ExtendedField } from "../../../components/forms/controls/ExtendedField";
import { SelectField } from "../../../components/forms/controls/SelectField";
import { Control } from "../../../components/forms/controls/Control";
import { ControlsList } from "../../../components/forms/ControlsList";
// Types
import { ControlReactHookForm, FieldsetWithErrors } from "../../../ts/types";

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
const _facilities = [
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

const _media = [
  { name: "hasGas", label: "gaz" },
  { name: "hasInternet", label: "internet" },
  { name: "hasPhone", label: "telefon" },
];

// File interfaces
export interface DetailsState {
  facilities: { [index: string]: boolean };
  media: { [index: string]: boolean };
}

// Props and default props
type Props = HTMLAttributes<HTMLDivElement> &
  ControlReactHookForm &
  FieldsetWithErrors;

export const Details = React.memo(
  ({ register, control, errors, watch, ...rest }: Props) => {
    // States
    const [facilities, setFacilities] = useState<{ [index: string]: boolean }>({
      hasAirConditioning: false,
      kitchenIsFurnished: false,
      hasBasement: false,
      hasIntercom: false,
      hasFridge: false,
      hasTVSet: false,
      hasFurniture: false,
      hasAttic: false,
      hasGasOven: false,
      hasGarden: false,
      hasWashingMachine: false,
      closedComplex: false,
    });
    const [media, setMedia] = useState<{ [index: string]: boolean }>({
      hasGas: false,
      hasInternet: false,
      hasPhone: false,
    });

    // Variables
    const facilitiesControls = _facilities.map((data) => (
      <Control
        id={data.name}
        name={data.name}
        label={data.label}
        value={data.name}
        checked={facilities[data.name]}
        modifiers={["display-block"]}
        mixes={["fieldset"]}
        key={data.name}
      />
    ));

    const mediaControls = _media.map((data) => (
      <Control
        id={data.name}
        name={data.name}
        label={data.label}
        value={data.name}
        checked={media[data.name]}
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
          <ExtendedField
            mixes={["fieldset"]}
            errorMessages={[errors.constructionYear?.message]}
          >
            <Label htmlFor="constructionYear" label="rok budowy" />
            <Field
              modifiers={["medium"]}
              render={(className: string) => (
                <Controller
                  as={NumberFormat}
                  thousandSeparator=""
                  decimalScale={0}
                  allowNegative={false}
                  id="constructionYear"
                  name="constructionYear"
                  control={control}
                  className={className}
                />
              )}
            />
          </ExtendedField>
          <ExtendedField mixes={["fieldset"]}>
            <Label htmlFor="buildingType" label="typ budynku" />
            <Controller
              name="buildingType"
              control={control}
              render={(
                { onChange, onBlur, value, name, ref },
                { invalid, isTouched, isDirty }
              ) => (
                <SelectField
                  value={value}
                  onChange={onChange}
                  isClearable={true}
                  options={buildingTypeOptions}
                  widthMedium={true}
                  name={name}
                  inputId={name}
                />
              )}
            />
          </ExtendedField>
          <ExtendedField mixes={["fieldset"]}>
            <Label htmlFor="condition" label="stan mieszkania" />
            <Controller
              name="condition"
              control={control}
              render={(
                { onChange, onBlur, value, name, ref },
                { invalid, isTouched, isDirty }
              ) => (
                <SelectField
                  value={value}
                  onChange={onChange}
                  isClearable={true}
                  options={conditionOptions}
                  widthMedium={true}
                  name={name}
                  inputId={name}
                />
              )}
            />
          </ExtendedField>
          <ExtendedField mixes={["fieldset"]}>
            <Label htmlFor="level" label="liczba poziomów" />
            <Controller
              name="level"
              control={control}
              render={(
                { onChange, onBlur, value, name, ref },
                { invalid, isTouched, isDirty }
              ) => (
                <SelectField
                  value={value}
                  onChange={onChange}
                  isClearable={true}
                  options={levelOptions}
                  widthMedium={true}
                  name={name}
                  inputId={name}
                />
              )}
            />
          </ExtendedField>
          <ExtendedField mixes={["fieldset"]}>
            <Label htmlFor="kitchenType" label="typ kuchni" />
            <Controller
              name="kitchenType"
              control={control}
              render={(
                { onChange, onBlur, value, name, ref },
                { invalid, isTouched, isDirty }
              ) => (
                <SelectField
                  value={value}
                  onChange={onChange}
                  isClearable={true}
                  options={kitchenTypeOptions}
                  widthMedium={true}
                  name={name}
                  inputId={name}
                />
              )}
            />
          </ExtendedField>
          <ExtendedField mixes={["fieldset"]}>
            <Label htmlFor="isBathroomWithWC" label="łazienka i WC" />
            <Controller
              name="isBathroomWithWC"
              control={control}
              render={(
                { onChange, onBlur, value, name, ref },
                { invalid, isTouched, isDirty }
              ) => (
                <SelectField
                  value={value}
                  onChange={onChange}
                  isClearable={true}
                  options={isBathroomWithWCOptions}
                  widthMedium={true}
                  name={name}
                  inputId={name}
                />
              )}
            />
          </ExtendedField>
          <ExtendedField
            mixes={["fieldset"]}
            errorMessages={[errors.insideHeight?.message]}
          >
            <Label htmlFor="insideHeight" label="wysokość pomieszczeń (cm)" />
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
                  id="insideHeight"
                  name="insideHeight"
                  control={control}
                  className={className}
                />
              )}
            />
          </ExtendedField>
          <ExtendedField mixes={["fieldset"]}>
            <Label
              htmlFor="energyDemand"
              label="zapotrzebowanie energetyczne (kWh/(m²·rok))"
            />
            <Field
              modifiers={["medium"]}
              render={(className: string) => (
                <Controller
                  as={NumberFormat}
                  thousandSeparator=" "
                  decimalSeparator=","
                  decimalScale={3}
                  allowedDecimalSeparators={[".", ","]}
                  allowNegative={false}
                  id="energyDemand"
                  name="energyDemand"
                  control={control}
                  className={className}
                />
              )}
            />
          </ExtendedField>
          <ExtendedField mixes={["fieldset"]}>
            <Label htmlFor="heating" label="ogrzewanie" />
            <Controller
              name="heating"
              control={control}
              render={(
                { onChange, onBlur, value, name, ref },
                { invalid, isTouched, isDirty }
              ) => (
                <SelectField
                  value={value}
                  onChange={onChange}
                  isClearable={true}
                  options={heatingOptions}
                  widthMedium={true}
                  name={name}
                  inputId={name}
                />
              )}
            />
          </ExtendedField>
          <ExtendedField mixes={["fieldset"]}>
            <Label htmlFor="parkingPlace" label="miejsce parkingowe" />
            <Controller
              name="parkingPlace"
              control={control}
              render={(
                { onChange, onBlur, value, name, ref },
                { invalid, isTouched, isDirty }
              ) => (
                <SelectField
                  value={value}
                  onChange={onChange}
                  isClearable={true}
                  options={parkingPlaceOptions}
                  widthMedium={true}
                  name={name}
                  inputId={name}
                />
              )}
            />
          </ExtendedField>
          <ExtendedField mixes={["fieldset"]}>
            <Label htmlFor="hasBalcony" label="balkon" />
            <Controller
              name="hasBalcony"
              control={control}
              render={(
                { onChange, onBlur, value, name, ref },
                { invalid, isTouched, isDirty }
              ) => (
                <SelectField
                  value={value}
                  onChange={onChange}
                  isClearable={true}
                  options={hasBalconyOptions}
                  widthMedium={true}
                  name={name}
                  inputId={name}
                />
              )}
            />
          </ExtendedField>
          <ExtendedField mixes={["fieldset"]}>
            <Label htmlFor="hasTerrace" label="taras" />
            <Controller
              name="hasTerrace"
              control={control}
              render={(
                { onChange, onBlur, value, name, ref },
                { invalid, isTouched, isDirty }
              ) => (
                <SelectField
                  value={value}
                  onChange={onChange}
                  isClearable={true}
                  options={hasTerraceOptions}
                  widthMedium={true}
                  name={name}
                  inputId={name}
                />
              )}
            />
          </ExtendedField>
          <ExtendedField mixes={["fieldset"]}>
            <Label htmlFor="hasElevator" label="winda" />
            <Controller
              name="hasElevator"
              control={control}
              render={(
                { onChange, onBlur, value, name, ref },
                { invalid, isTouched, isDirty }
              ) => (
                <SelectField
                  value={value}
                  onChange={onChange}
                  isClearable={true}
                  options={hasElevatorOptions}
                  widthMedium={true}
                  name={name}
                  inputId={name}
                />
              )}
            />
          </ExtendedField>
          <Controller
            name="firstOwner"
            control={control}
            defaultValue={false}
            render={(
              { onChange, onBlur, value, name, ref },
              { invalid, isTouched, isDirty }
            ) => (
              <Control
                id={name}
                name={name}
                label="oferta z rynku pierwotnego"
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
                mixes={["fieldset"]}
              />
            )}
          />
          <ExtendedField
            mixes={["fieldset"]}
            errorMessages={[errors.vacatedFrom?.message]}
          >
            <Label htmlFor="vacatedFrom" label="dostępne od" />
            <Field
              modifiers={["medium"]}
              render={(className: string) => (
                <Controller
                  as={NumberFormat}
                  format="##.##.####"
                  mask="_"
                  allowEmptyFormatting
                  id="vacatedFrom"
                  name="vacatedFrom"
                  control={control}
                  className={className}
                />
              )}
            />
          </ExtendedField>
          <ExtendedField>
            <Label label="udogodnienia" />
            <Controller
              name="facilities"
              control={control}
              defaultValue={facilities}
              render={(
                { onChange, onBlur, value, name, ref },
                { invalid, isTouched, isDirty }
              ) => (
                <ControlsList
                  inputs={facilitiesControls.map((radio) =>
                    React.cloneElement(radio, {
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        const copyFacilities = { ...facilities };
                        const { name: _name, checked: _checked } = e.target;

                        onChange({
                          ...copyFacilities,
                          [_name]: _checked,
                        });

                        setFacilities((prevState) => ({
                          ...prevState,
                          [_name]: _checked,
                        }));
                      },
                    })
                  )}
                  n={3}
                />
              )}
            />
          </ExtendedField>
          <ExtendedField>
            <Label label="media" />
            <Controller
              name="media"
              control={control}
              render={(
                { onChange, onBlur, value, name, ref },
                { invalid, isTouched, isDirty }
              ) => (
                <ControlsList
                  inputs={mediaControls.map((radio) =>
                    React.cloneElement(radio, {
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        const copyMedia = { ...media };
                        const { name: _name, checked: _checked } = e.target;

                        onChange({
                          ...copyMedia,
                          [_name]: _checked,
                        });

                        setMedia((prevState) => ({
                          ...prevState,
                          [_name]: _checked,
                        }));
                      },
                    })
                  )}
                  n={3}
                />
              )}
            />
          </ExtendedField>
        </Fieldset>
      </div>
    );
  }
);
