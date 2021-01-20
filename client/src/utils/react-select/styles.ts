import { StylesConfig } from "react-select";

export const customStyles: StylesConfig = {
  container: (styles, state) => ({
    ...styles,
    width: state.selectProps.widthExtraSmall
      ? "65px"
      : state.selectProps.widthSmall
      ? "130px"
      : state.selectProps.widthMedium
      ? "195px"
      : state.selectProps.widthLarge
      ? "260px"
      : undefined,
  }),
};
