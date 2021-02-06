const handleProduction = (isTrue: any, isFalse: any) =>
  process.env.NODE_ENV === "production" ? isFalse : isTrue;

export const MAPBOX_ACCESS_TOKEN = handleProduction(
  process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
  undefined
);

export const gridBreakpoints = {
  // Extra small screen / phone
  xs: 0,
  // Small screen / phone
  sm: 576,
  // Medium screen / tablet
  md: 768,
  // Large screen / desktop
  lg: 992,
  // Extra large screen / wide desktop
  xl: 1200,
};
