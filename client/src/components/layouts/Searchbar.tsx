import React from "react";
import { useLocation } from "react-router-dom";

const forbidden = ["form"];

const Searchbar = () => {
  const location = useLocation();

  if (
    forbidden.some((partOfPathname) =>
      location.pathname.includes(partOfPathname)
    )
  )
    return null;

  return <section className="searchbar"></section>;
};

export default Searchbar;
