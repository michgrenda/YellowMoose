import React from "react";
// Containers
import { OfferContainer } from "../containers/OfferContainer";

const FormPage = () => {
  return (
    <section className="form-page">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <header className="form-page__header">
              <h1 className="form-page__title">dodaj ogłoszenie</h1>
            </header>
          </div>
          <div className="col-12">
            <OfferContainer />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormPage;
