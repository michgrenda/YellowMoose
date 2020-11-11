import React from "react";
import { BrowserRouter } from "react-router-dom";
// Components
import Navbar from "./components/layouts/Navbar";
import Searchbar from "./components/layouts/Searchbar";
import Map from "./components/Map/Map";
import Listing from "./components/Listing/Listing";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Searchbar />

      <main className="main">
        <div className="container-fluid">
          <div className="row">
            <section className="listing-box-container col-12 col-lg-7">
              <Listing />
            </section>
            <section className="map-box-container col-5 d-none d-lg-block">
              <Map />
            </section>
          </div>
        </div>
      </main>
    </BrowserRouter>
  );
};

export default App;
