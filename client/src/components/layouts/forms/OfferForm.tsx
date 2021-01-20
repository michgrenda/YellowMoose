import React, { useState, FormHTMLAttributes, useMemo } from "react";
// Errors
import { errorMessages } from "../../../utils/validators";
// React-hook-form
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// Components
import { Button } from "../../form/controls/Button";
// Fieldsets
import { BaseParameters } from "../fieldsets/BaseParameters";
import { Location } from "../fieldsets/Location";
import { ContactData } from "../fieldsets/ContactData";
import { Transaction } from "../fieldsets/Transaction";
import { PropertyType } from "../fieldsets/PropertyType";
import { Photo } from "../fieldsets/Photo";
import { Details } from "../fieldsets/Details";
import { DescriptionData } from "../fieldsets/DescriptionData";
// Types
import { OptionType } from "../../../types";

// File types
type PropertyTypeType =
  | "flat"
  | "house"
  | "plot"
  | "commercial-building"
  | "garage"
  | "room";
type TransactionType = "sell" | "rent";
type FileType = File & { preview: string; rotation: number };
// React-hook-form
type FormValues = {
  title: string;
};

// File interfaces
export interface BaseParametersState {
  title: string;
  area: string;
  rooms: string;
  price: string;
  currency: OptionType<false>;
  negotiable: boolean;
  isRentInPrice: OptionType<false>;
  floor: OptionType<false>;
  numberOfFloors: OptionType<false>;
}
export interface LocationState {
  ZIPCode: string;
  voivodeship: OptionType<false>;
}
export interface DescriptionDataState {
  description: string;
}
export interface DetailsState {
  constructionYear: string;
  buildingType: OptionType<false>;
  condition: OptionType<false>;
  level: OptionType<false>;
  kitchenType: OptionType<false>;
  isBathroomWithWC: OptionType<false>;
  insideHeight: string;
  energyDemand: string;
  heating: OptionType<false>;
  parkingPlace: OptionType<false>;
  hasBalcony: OptionType<false>;
  hasTerrace: OptionType<false>;
  hasElevator: OptionType<false>;
  firstOwner: boolean;
  vacatedFrom: string;
  facilities: { [index: string]: boolean };
  media: { [index: string]: boolean };
}
export interface ContactDataState {
  firstname: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  ownerType: OptionType<false>;
}
export interface PropertyTypeState {
  type: PropertyTypeType;
}
export interface TransactionState {
  transaction: TransactionType;
}
export interface PhotoState {
  files: FileType[];
}

// Props and default props
type Props = FormHTMLAttributes<HTMLFormElement>;

// Yup
const isRequriedAndNumber = yup
  .number()
  .required(errorMessages.isRequired)
  .transform((cv) => (isNaN(cv) ? undefined : cv));
const isRequiredAndString = yup.string().required(errorMessages.isRequired);

export const OfferForm = (props: Props) => {
  // States
  const [baseParameters, setBaseParameters] = useState<BaseParametersState>({
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
  const [location, setLocation] = useState<LocationState>({
    ZIPCode: "",
    voivodeship: null,
  });
  const [photo, setPhoto] = useState<PhotoState>({ files: [] });
  const [descriptionData, setDescriptionData] = useState<DescriptionDataState>({
    description: "",
  });
  const [details, setDetails] = useState<DetailsState>({
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
  const [contactData, setContactData] = useState<ContactDataState>({
    firstname: "",
    email: "",
    phoneNumber: "",
    countryCode: "48",
    ownerType: null,
  });
  const [propertyType, setPropertyType] = useState<PropertyTypeState>({
    type: "flat",
  });
  const [transaction, setTransaction] = useState<TransactionState>({
    transaction: "sell",
  });

  const _floor = useMemo(() => {
    const value = baseParameters.floor?.value;

    return value ? parseInt(value) : Number.MIN_SAFE_INTEGER;
  }, [baseParameters.floor?.value]);
  const _numberOfFloors = useMemo(() => {
    const value = baseParameters.numberOfFloors?.value;

    return value ? parseInt(value) : Number.MAX_SAFE_INTEGER;
  }, [baseParameters.numberOfFloors?.value]);

  const formSchema = useMemo(
    () =>
      yup.object().shape({
        title: isRequiredAndString,
        area: isRequriedAndNumber,
        rooms: isRequriedAndNumber,
        price: isRequriedAndNumber,
        floor: yup.object().shape({
          value: isRequriedAndNumber.max(
            _numberOfFloors,
            "Pole piętro nie może być większe od pola liczba pięter"
          ),
          label: isRequriedAndNumber,
        }),
        numberOfFloors: yup.object().shape({
          value: isRequriedAndNumber.min(
            _floor,
            "Pole liczba pięter nie może być mniejsze od pola piętro"
          ),
          label: isRequriedAndNumber,
        }),
      }),
    [_floor, _numberOfFloors]
  );

  // React-hook-form
  const { register, handleSubmit, clearErrors, errors, control } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(formSchema),
  });

  const { title, area, rooms, price, floor, numberOfFloors } = errors;
  const baseParametersErrors = useMemo(
    () => ({
      title,
      area,
      rooms,
      price,
      floor,
      numberOfFloors,
    }),
    [title, area, rooms, price, floor, numberOfFloors]
  );

  // Handlers
  // -------------------------------------------------------------------
  const handleFormSubmit: SubmitHandler<FormValues> = (data, e) => {
    console.log(data, e);
  };

  const handleFormErrors: SubmitErrorHandler<FormValues> = (errors, e) => {
    console.log(errors, e);
  };

  return (
    <form
      className="offer-form"
      onSubmit={handleSubmit(handleFormSubmit, handleFormErrors)}
      autoComplete="off"
      noValidate
      {...props}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            {/* --------------------------------- Transaction box --------------------------------- */}
            <Transaction data={transaction} setData={setTransaction} />
            {/* --------------------------------- End --------------------------------- */}
          </div>
          <div className="col-12">
            {/* --------------------------------- Types box --------------------------------- */}
            <PropertyType data={propertyType} setData={setPropertyType} />
            {/* --------------------------------- End --------------------------------- */}
          </div>
          <div className="col-12">
            {/* --------------------------------- Base parameters --------------------------------- */}
            <BaseParameters
              data={baseParameters}
              setData={setBaseParameters}
              register={register}
              control={control}
              clearErrors={clearErrors}
              errors={baseParametersErrors}
            />
            {/* --------------------------------- End --------------------------------- */}
          </div>
          <div className="col-12">
            {/* --------------------------------- Description data --------------------------------- */}
            <DescriptionData
              data={descriptionData}
              setData={setDescriptionData}
            />
            {/* --------------------------------- End --------------------------------- */}
          </div>
          <div className="col-12">
            {/* --------------------------------- Location --------------------------------- */}
            <Location data={location} setData={setLocation} />
            {/* --------------------------------- End --------------------------------- */}
          </div>
          <div className="col-12">
            {/* --------------------------------- Photo --------------------------------- */}
            <Photo data={photo} setData={setPhoto} />
            {/* --------------------------------- End --------------------------------- */}
          </div>
          <div className="col-12">
            {/* --------------------------------- Details --------------------------------- */}
            <Details data={details} setData={setDetails} />
            {/* --------------------------------- End --------------------------------- */}
          </div>
          <div className="col-12">
            {/* --------------------------------- Contact data --------------------------------- */}
            <ContactData data={contactData} setData={setContactData} />
            {/* --------------------------------- End --------------------------------- */}
          </div>
          <div className="col-12">
            <div className="offer-form__submit-button-wrapper">
              <Button
                text="Dodaj ogłoszenie"
                type="submit"
                modifiers={["primary"]}
                mixes={["offer-form"]}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
