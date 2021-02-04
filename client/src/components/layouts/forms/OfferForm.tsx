import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  FormHTMLAttributes,
} from "react";
// Errors
import { errorMessages } from "../../../utils/validators";
import { scrollToElement } from "../../../utils/scroll";
// React-hook-form
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// Components
import { Button } from "../../forms/controls/Button";
import { Wave } from "../../Wave";
// Fieldsets
import { BaseParameters } from "../fieldsets/BaseParameters";
import { Location } from "../fieldsets/Location";
import { ContactData } from "../fieldsets/ContactData";
import { Transaction } from "../fieldsets/Transaction";
import { PropertyType } from "../fieldsets/PropertyType";
import { Photo } from "../fieldsets/Photo";
import { Details } from "../fieldsets/Details";
import { DescriptionData } from "../fieldsets/DescriptionData";
// Context
import { FormTypeContext } from "../../../pages/FormPage";
// Types
import { TransactionType } from "../fieldsets/Transaction";
import { PropertyTypeType } from "../fieldsets/PropertyType";

// File types
type FileType = File & { preview: string; rotation: number };
// React-hook-form
type FormValues = {
  [index: string]: any;
};

// File interfaces
export interface BaseParametersState {
  floor: number;
  numberOfFloors: number;
}
export interface PhotoState {
  files: FileType[];
}

// Props and default props
type Props = FormHTMLAttributes<HTMLFormElement>;

// Yup
const isNumber = yup
  .number()
  .transform((cv) => (isNaN(cv) ? undefined : cv))
  .transform((cv, ov) =>
    ov.length ? Number(ov.replace(/ /g, "").replace(/,/, ".")) : cv
  );
const isRequriedAndNumber = isNumber.required(errorMessages.isRequired);
const isRequiredAndString = yup.string().required(errorMessages.isRequired);

export const OfferForm = (props: Props) => {
  // States
  const [photo, setPhoto] = useState<PhotoState>({ files: [] });
  // To validations
  const [baseParameters, setBaseParameters] = useState<BaseParametersState>({
    floor: Number.MIN_SAFE_INTEGER,
    numberOfFloors: Number.MAX_SAFE_INTEGER,
  });
  // Context
  const formType = useContext(FormTypeContext);

  // Validation
  const {
    floor: floorState,
    numberOfFloors: numberOfFloorsState,
  } = baseParameters;
  // Resolver
  const formSchema = useMemo(
    () =>
      yup.object().shape({
        // Base parameters
        title: isRequiredAndString.max(
          50,
          "Tytuł jest za długi (maksymalnie 50 znaków)"
        ),
        area: isRequriedAndNumber.max(
          99999999.99,
          "Maksymalna wartośc to 99 999 999,99"
        ),
        rooms: isRequriedAndNumber.max(150, "Maksymalna wartośc to 150"),
        price: isRequriedAndNumber,
        floor: yup.object().shape({
          value: isRequriedAndNumber.max(
            numberOfFloorsState,
            "Pole piętro nie może być większe od pola liczba pięter"
          ),
          label: isRequriedAndNumber,
        }),
        numberOfFloors: yup.object().shape({
          value: isRequriedAndNumber.min(
            floorState,
            "Pole liczba pięter nie może być mniejsze od pola piętro"
          ),
          label: isRequriedAndNumber,
        }),
        // Description data
        description: isRequiredAndString.max(
          6000,
          "Opis jest za długi (maksymalnie 6000 znaków)"
        ),
        // Location
        voivodeship: yup.object().shape({
          value: isRequiredAndString,
          label: isRequiredAndString,
        }),
        // Contact data
        firstname: isRequiredAndString.max(
          25,
          "Imię jest za długie (maksymalnie 25 znaków)"
        ),
        email: isRequiredAndString
          .max(25, "Adres e-mail jest za długi (maksymalnie 25 znaków)")
          .email("Nieprawidłowy adres e-mail"),
        dialCode: isRequiredAndString
          .max(25, "Numer kierunkowy jest za długi (maksymalnie 25 znaków)")
          .notOneOf(["+"], errorMessages.isRequired),
        phoneNumber: isRequiredAndString.max(
          25,
          "Telefon kontaktowy jest za długi (maksymalnie 25 znaków)"
        ),
        ownerType: yup.object().shape({
          value: isRequiredAndString,
          label: isRequiredAndString,
        }),
        // Details
        constructionYear: isNumber
          .min(1100, "Minimalna wartość to 1100")
          .max(
            new Date().getFullYear(),
            "Maksymalny rok budowy to rok bieżący"
          ),
        insideHeight: isNumber.max(9999.99, "Maksymalna wartośc to 9 999,99"),
        vacatedFrom: yup
          .date()
          .transform((_, ov) => {
            const [day, month, year] = ov.split(".");

            return new Date(`${year}-${month}-${day}`);
          })
          .typeError("Data jest nieprawidłowa"),
      }),
    [floorState, numberOfFloorsState]
  );

  // React-hook-form
  const {
    register,
    handleSubmit,
    getValues,
    clearErrors,
    setValue,
    watch,
    errors,
    control,
    formState,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(formSchema),
    shouldFocusError: false, // Inconsistent and that's why (replaced by scrollToElement)
  });

  const values = getValues();
  const { floor: _floor, numberOfFloors: _numberOfFloors } = values;

  useEffect(() => {
    const floor = _floor?.value || Number.MIN_SAFE_INTEGER;
    const numberOfFloors = _numberOfFloors?.value || Number.MAX_SAFE_INTEGER;

    setBaseParameters((prevState) => ({
      ...prevState,
      floor: floor,
      numberOfFloors: numberOfFloors,
    }));
  }, [_floor, _numberOfFloors]);

  useEffect(() => {
    if (formState.submitCount)
      scrollToElement('.offer-form [data-valid="invalid"]', -10);
  }, [formState.submitCount]);

  const {
    // Base parameters
    title,
    area,
    rooms,
    price,
    floor,
    numberOfFloors,
    // Description data
    description,
    // Location
    voivodeship,
    // Contact data
    firstname,
    email,
    dialCode,
    phoneNumber,
    ownerType,
    // Details
    constructionYear,
    insideHeight,
    vacatedFrom,
  } = errors;
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
  const descriptionDataErrors = useMemo(() => ({ description }), [description]);
  const locationErrors = useMemo(() => ({ voivodeship }), [voivodeship]);
  const contactDataErrors = useMemo(
    () => ({ firstname, email, dialCode, phoneNumber, ownerType }),
    [firstname, email, dialCode, phoneNumber, ownerType]
  );
  const detailsErrors = useMemo(
    () => ({ constructionYear, insideHeight, vacatedFrom }),
    [constructionYear, insideHeight, vacatedFrom]
  );

  // Handlers
  // -------------------------------------------------------------------
  const handleFormSubmit: SubmitHandler<FormValues> = (data, e) => {
    console.log("data", data, e);
  };

  const handleFormErrors: SubmitErrorHandler<FormValues> = (errors, e) => {
    console.log("errors", errors, e);
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
            <Transaction
              transaction={formType.transaction as TransactionType}
              control={control}
            />
            {/* --------------------------------- End --------------------------------- */}
          </div>
          <div className="col-12">
            {/* --------------------------------- Types box --------------------------------- */}
            <PropertyType
              propertyType={formType.propertyType as PropertyTypeType}
              control={control}
            />
            {/* --------------------------------- End --------------------------------- */}
          </div>
          <div className="col-12">
            {/* --------------------------------- Base parameters --------------------------------- */}
            <BaseParameters
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
              register={register}
              errors={descriptionDataErrors}
            />
            {/* --------------------------------- End --------------------------------- */}
          </div>
          <div className="col-12">
            {/* --------------------------------- Location --------------------------------- */}
            <Location
              register={register}
              control={control}
              errors={locationErrors}
              watch={watch}
              setValue={setValue}
            />
            {/* --------------------------------- End --------------------------------- */}
          </div>
          <div className="col-12">
            {/* --------------------------------- Photo --------------------------------- */}
            <Photo data={photo} setData={setPhoto} />
            {/* --------------------------------- End --------------------------------- */}
          </div>
          <div className="col-12">
            {/* --------------------------------- Details --------------------------------- */}
            <Details
              register={register}
              control={control}
              errors={detailsErrors}
            />
            {/* --------------------------------- End --------------------------------- */}
          </div>
          <div className="col-12">
            {/* --------------------------------- Contact data --------------------------------- */}
            <ContactData
              register={register}
              control={control}
              errors={contactDataErrors}
            />
            {/* --------------------------------- End --------------------------------- */}
          </div>
          <div className="col-12">
            <div className="offer-form__submit-button-wrapper">
              <Wave
                component={
                  <Button
                    text="dodaj ogłoszenie"
                    type="submit"
                    modifiers={["primary", "primary-filled", "medium-500"]}
                    mixes={["offer-form"]}
                  />
                }
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
