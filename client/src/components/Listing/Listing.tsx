import React from "react";
import { NavLink } from "react-router-dom";
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

// Interfaces
interface Routes {
  path: string;
  text: string;
}

// TEMPORARY
const routes: Routes[] = [
  {
    path: "/all",
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

const Listing: React.FC = () => {
  // TEMPORARY
  const results = data.map((singleData, index) => (
    <SingleResult singleData={singleData} key={index} />
  ));

  return (
    <section className="listing">
      <div className="container-fluid">
        <div className="listing__header">
          {routes.map((route) => (
            <NavLink
              to={route.path}
              className="listing__link"
              activeClassName="listing__link--is-active"
              key={route.path}
            >
              <div className="listing__link-text-wrapper">
                <div className="listing__link-text">{route.text}</div>
              </div>
            </NavLink>
          ))}
        </div>
        <div className="listing__main">{results}</div>
      </div>
    </section>
  );
};

export default Listing;
