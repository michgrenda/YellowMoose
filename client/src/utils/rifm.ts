// Parsers
export const parseInteger: (string: string) => string = (string) =>
  (string.match(/\d+/g) || []).join("");

export const parseDigits: (string: string) => string = (string) =>
  (string.match(/\d+ ?/g) || []).join("");

export const parseNumber: (string: string) => string = (string) =>
  (string.match(/\d+[.,]?\d*/g) || []).join("");

// Masks
export const addZIPCodeMask: (string: string) => string = (string) => {
  const digits = parseInteger(string);
  const postalDistrict = digits.slice(0, 1).padEnd(1, "_");
  const geographicalSubdivisionDistrict = digits.slice(1, 2).padEnd(1, "_");
  const postOfficeStreet = digits.slice(2, 5).padEnd(3, "_");
  return `${postalDistrict}${geographicalSubdivisionDistrict}-${postOfficeStreet}`;
};

export const addDateMask: (string: string) => string = (string) => {
  const digits = parseInteger(string);
  const days = digits.slice(0, 2).padEnd(2, "_");
  const months = digits.slice(2, 4).padEnd(2, "_");
  const years = digits.slice(4, 8).padEnd(4, "_");
  return `${days}.${months}.${years}`;
};

// Replace
export const replaceDotWithComma: (value: string) => string = (value) =>
  value.replace(".", ",");

// Formats
export const formatZIPCode: (value: string) => string = (value) => {
  const digits = parseInteger(value);
  const chars = digits.split("");
  return chars
    .reduce((r, v, index) => (index === 2 ? `${r}-${v}` : `${r}${v}`), "")
    .substr(0, 6);
};

export const formatInteger: (value: string) => string = (string) => {
  const parsed = parseInteger(string);
  const number = Number.parseInt(parsed, 10);
  if (Number.isNaN(number)) {
    return "";
  }
  return number.toLocaleString("pl-PL");
};

export const formatFloatingPointNumber: (
  value: string,
  maxDigits: number
) => string = (value, maxDigits) => {
  const parsed = parseNumber(value);
  const [head, tail] = parsed.split(/[.,]/);
  // Avoid rounding errors at toLocaleString as when user enters 1.239 and maxDigits=2 we must not to convert it to 1.24, it must stay 1.23
  const scaledTail = tail != null ? tail.slice(0, maxDigits) : "";

  const number = Number.parseFloat(`${head}.${scaledTail}`);

  if (Number.isNaN(number)) {
    return "";
  }

  const formatted = number.toLocaleString("pl-PL", {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDigits,
  });

  const commaSeparator = parsed.includes(",");
  const dotSeparator = parsed.includes(".");
  if (commaSeparator || dotSeparator) {
    const [formattedHead] = formatted.split(",");

    // skip zero at digits position for non fixed floats as at digits 2 for non fixed floats numbers like 1.50 has no sense, just 1.5 allowed but 1.0 has sense as otherwise you will not be able to enter 1.05 for example
    const formattedTail =
      scaledTail !== "" && scaledTail[maxDigits - 1] === "0"
        ? scaledTail.slice(0, -1)
        : scaledTail;
    if (commaSeparator) return `${formattedHead},${formattedTail}`;
    if (dotSeparator) return `${formattedHead}.${formattedTail}`;
  }

  return formatted;
};

export const formatPhone: (value: string) => string = (string) =>
  parseDigits(string);

export const formatCountryCode: (value: string) => string = (string) => {
  return `+${parseDigits(string)}`;
};

export const formatDate: (value: string) => string = (string) => {
  const digits = parseInteger(string);
  const chars = digits.split("");
  return chars
    .reduce(
      (r, v, index) => (index === 2 || index === 4 ? `${r}.${v}` : `${r}${v}`),
      ""
    )
    .substr(0, 10);
};
