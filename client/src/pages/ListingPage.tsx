import React from "react";
// Containers
import { ListingContainer } from "../containers/ListingContainer";
import { MapContainer } from "../containers/MapContainer";

export const ListingPage = () => {
  return (
    <section className="listing-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-6">
            <section className="listing-box-container">
              <ListingContainer />
            </section>
          </div>
          <div className="col-6">
            <section className="map-box-container d-none d-lg-block">
              <MapContainer />
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};
