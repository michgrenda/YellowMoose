import {
  parsePhoneNumber,
  ParseError,
  CountryCode,
} from "libphonenumber-js/max";

export const errorMessages = {
  isRequired: "Pole jest wymagane",
  isNumber: "Pole musi być liczbą",
  isEmail: "Adres e-mail jest nieprawidłowy",
  isPhoneNumber: "Telefon konktatkowy jest nieprawidłowy",
};

export const isPhoneNumber = (
  text: string,
  defaultCountry: CountryCode = "PL"
) => {
  try {
    const parsedNumber = parsePhoneNumber(text, defaultCountry);

    return parsedNumber.isValid();
  } catch (error) {
    if (error instanceof ParseError) {
      // Not a phone number, non-existent country, etc.
    }
  }
};
