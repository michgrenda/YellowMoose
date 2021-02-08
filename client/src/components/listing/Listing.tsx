import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import classNames from "classnames";
// Components
import SingleResult from "./SingleResult";

// TEMPORARY
const data = [
  {
    location: "Warszawa",
    category: "Kawalerka do wynajęcia",
    title: "1 piętro",
    price: 2100,
    priceCurrency: 52.5,
  },
];

// Data
const routes = [
  {
    path: "/",
    text: "wszystkie",
  },
  {
    path: "/private",
    text: "prywatne",
  },
  {
    path: "/business",
    text: "biura / deweloperzy",
  },
];

// File interfaces
interface ListingProps {
  buttons?: React.ReactElement[];
}

// Props and default props
type Props = ListingProps;

export const Listing = ({ buttons }: Props) => {
  // Location
  const location = useLocation();

  // TEMPORARY
  // const results = data.map((singleData, index) => (
  //   <SingleResult singleData={singleData} key={index} />
  // ));

  const routesList = routes.map(({ path, text }) => (
    <li
      className={classNames(
        "listing__item",
        location.pathname === path && "listing__item--is-active"
      )}
      key={path}
    >
      <NavLink
        to={path}
        className="listing__link"
        activeClassName="listing__link--is-active"
      >
        <div className="listing__link-text-wrapper">
          <span className="listing__link-text">{text}</span>
        </div>
      </NavLink>
    </li>
  ));

  const buttonsList = buttons?.map((button, index) => (
    <li className="listing__item" key={index}>
      {button}
    </li>
  ));

  return (
    <div className="listing">
      <header className="listing__header">
        <ul className="listing__list">{routesList}</ul>
        <ul className="listing__list d-flex d-lg-none">{buttonsList}</ul>
      </header>
      <div className="listing__results">{/* {results} */}</div>
    </div>
  );
};
