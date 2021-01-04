import { StylesConfig } from "react-select";

export const customStyles: StylesConfig = {
  container: (styles, state) => ({
    ...styles,
    marginTop: state.selectProps.marginTop,
    marginRight: state.selectProps.marginRight,
    marginBottom: state.selectProps.marginBottom,
    marginLeft: state.selectProps.marginLeft,
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
