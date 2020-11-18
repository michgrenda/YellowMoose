import React from "react";
// Containers
import ListingContainer from "../containers/ListingContainer";
import MapContainer from "../containers/MapContainer";

const ListingPage: React.FC = () => {
  return (
    <section className="listing-page">
      <div className="container-fluid">
        <div className="row">
          <section className="listing-box-container col-12 col-lg-7">
            <ListingContainer />
          </section>
          <section className="map-box-container col-5 d-none d-lg-block">
            <MapContainer />
          </section>
        </div>
      </div>
    </section>
  );
};

export default ListingPage;
