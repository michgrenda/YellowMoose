import React from "react";
import { NavLink } from "react-router-dom";
// Components
import SingleResult from "./SingleResult";

// Delete
const data = [
  {
    location: "Warszawa, Praga-Północ, Mała",
    category: "Kawalerka do wynajęcia",
    title: "1p, Praga Północ, 40 m2, metro, do negocjacji",
    price: 2100,
    priceCurrency: 52.5,
  },
];

const Listing = () => {
  // Delete
  const results = data.map((singleData) => (
    <SingleResult singleData={singleData} />
  ));

  return (
    <div className="listing">
      <div className="listing__header">
        <NavLink
          to="/all"
          className="listing__link"
          activeClassName="listing__link--is-active"
        >
          <div className="listing__link-text-wrapper">
            <div className="listing__link-text">Wszystkie</div>
          </div>
        </NavLink>
        <NavLink
          to="/private"
          className="listing__link"
          activeClassName="listing__link--is-active"
        >
          <div className="listing__link-text-wrapper">
            <div className="listing__link-text">Prywatne</div>
          </div>
        </NavLink>
        <NavLink
          to="/business"
          className="listing__link"
          activeClassName="listing__link--is-active"
        >
          <div className="listing__link-text-wrapper">
            <div className="listing__link-text">Biura / Deweloperzy</div>
          </div>
        </NavLink>
      </div>
      <div className="listing__main">{results}</div>
    </div>
  );
};

export default Listing;
