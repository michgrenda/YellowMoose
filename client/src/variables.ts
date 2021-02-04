const handleProduction = (isTrue: any, isFalse: any) =>
  process.env.NODE_ENV === "production" ? isFalse : isTrue;

export const MAPBOX_ACCESS_TOKEN = handleProduction(
  process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
  undefined
);
